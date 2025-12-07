'use client';
import styles from './HomeMembers.module.css';
import Picture from '../Picture';
import { storyblokEditable } from '@storyblok/react';
import { useEffect, useRef } from 'react';

export default function HomeMembers({ blok }: { blok: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current || !wrapperRef.current) return;

    const container = containerRef.current;
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;

    function waitForImages(callback: () => void) {
      const images = inner.querySelectorAll('img');
      if (images.length === 0) {
        callback();
        return;
      }

      let loaded = 0;
      const checkComplete = () => {
        loaded++;
        if (loaded >= images.length) {
          requestAnimationFrame(() => {
            requestAnimationFrame(callback);
          });
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkComplete();
        } else {
          img.addEventListener('load', checkComplete, { once: true });
          img.addEventListener('error', checkComplete, { once: true });
        }
      });
    }

    function setupAnimation() {
      // Remove any existing clones
      const existingClones = inner.querySelectorAll('[data-clone="true"]');
      existingClones.forEach(clone => clone.remove());

      // Reset styles
      inner.style.width = '';
      inner.style.animation = '';
      inner.style.transform = '';
      container.setAttribute('data-scrolling', 'false');

      // Wait for images to load before measuring
      waitForImages(() => {
        if (!inner || !container || !wrapper) return;

        // Ensure no fixed width is set when measuring
        inner.style.width = '';
        void inner.offsetWidth;

        // Measure the actual width of all original logos (before cloning)
        // Get all original picture elements
        const originalLogos = Array.from(inner.querySelectorAll('picture:not([data-clone="true"])'));
        
        // Sum up the actual rendered widths of each logo for precise measurement
        let originalWidth = 0;
        originalLogos.forEach((logo: any) => {
          const rect = logo.getBoundingClientRect();
          originalWidth += rect.width;
        });

        // Fallback to scrollWidth if sum is 0 (shouldn't happen, but safety check)
        if (originalWidth === 0) {
          originalWidth = inner.scrollWidth;
        }

        const availableWidth = wrapper.offsetWidth || window.innerWidth;

        // If logos fit, center them
        if (originalWidth <= availableWidth) {
          container.setAttribute('data-scrolling', 'false');
          inner.style.width = '';
          inner.style.animation = '';
          return;
        }

        // Logos don't fit - need to animate
        // Round to avoid subpixel issues
        const roundedOriginalWidth = Math.round(originalWidth);
        
        // Clone all logos
        originalLogos.forEach((logo: any) => {
          const clone = logo.cloneNode(true) as HTMLElement;
          clone.setAttribute('data-clone', 'true');
          inner.appendChild(clone);
        });

        // Wait for clones to render, then set up animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!inner || !container) return;

            // Set container width to exactly 2x the original width
            // This ensures the -50% animation move equals exactly the original width
            const containerWidth = roundedOriginalWidth * 2;
            inner.style.width = `${containerWidth}px`;
            
            // Force reflow to apply width
            void inner.offsetWidth;

            // Verify the actual scrollWidth is close to our target
            const actualScrollWidth = inner.scrollWidth;
            const difference = Math.abs(actualScrollWidth - containerWidth);
            
            // If there's a small difference (due to flexbox rounding), use actual width
            // But only if it's within 5px - larger differences indicate a problem
            if (difference <= 5 && difference > 0) {
              inner.style.width = `${actualScrollWidth}px`;
              void inner.offsetWidth;
            }

            // Calculate animation duration (speed: 100px per second)
            const duration = Math.max(roundedOriginalWidth / 100, 5);

            // Set animation - moves exactly -50% which equals -originalWidth pixels
            // This creates a seamless loop because clones are positioned right after originals
            container.setAttribute('data-scrolling', 'true');
            inner.style.animation = `scroll ${duration}s linear infinite`;
            inner.style.transform = 'translateX(0)';

            // Force reflow to start animation
            void inner.offsetWidth;
          });
        });
      });
    }

    // Initial setup
    setupAnimation();

    // Handle resize
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Stop animation immediately
      if (inner) {
        inner.style.animation = 'none';
        inner.style.transform = 'translateX(0)';
      }

      resizeTimeoutRef.current = setTimeout(() => {
        setupAnimation();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [blok]);

  return (
    <section className={styles.home_members} {...storyblokEditable(blok)} ref={containerRef}>
      <h2 className={styles.title}>{blok.title}</h2>
      <div className={styles.logos} ref={wrapperRef}>
        <div className={styles.logos_inner} ref={innerRef}>
          {blok.logos.map((logo: any, index: number) => {
            return (
              <Picture
                key={`logo-${index}`}
                src={logo.filename}
                alt={logo.alt}
                aspectRatioDesktop="3.137"
                aspectRatioMobile="3.137"
                sizes="(min-width:840px) 11vw, 25vw"
                className={styles.logo}
                nofade={true}
                noCrop={true}
                priority={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { createHmac, timingSafeEqual } from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import {
  GLOBAL_SETTINGS_TAG,
  STORYBLOK_TAG,
  listTag,
  storyTag,
} from '@/lib/storyblok';

// Storyblok publish webhook (Settings -> Webhooks in the Storyblok space).
// On a story publish/unpublish/delete it purges the Next.js data cache
// entries for that story and the list pages of its folder, so published
// content is live within seconds instead of after the 5 minute TTL.
export async function POST(request: NextRequest) {
  const secret = process.env.STORYBLOK_WEBHOOK_SECRET;

  if (!secret) {
    console.error('STORYBLOK_WEBHOOK_SECRET is not set; refusing to process webhook.');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // Signature verification needs the raw body, so parse JSON afterwards.
  const rawBody = await request.text();
  const signature = request.headers.get('webhook-signature');

  // Two verification paths, because webhook secrets are not available on all
  // Storyblok plans:
  // - webhook-signature header (HMAC over the raw body), sent by plans that
  //   support webhook secrets
  // - shared secret in the URL query (?secret=...), for plans without
  const authorized = signature
    ? isValidSignature(rawBody, signature, secret)
    : matchesSecret(request.nextUrl.searchParams.get('secret'), secret);

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: {
    action?: string;
    full_slug?: string;
    story?: { full_slug?: string };
  };
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    console.error('Invalid webhook payload:', error);
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const slug = payload.full_slug || payload.story?.full_slug;

  // A story change affects the story itself and every list fetch of its
  // folder (e.g. a new insight changes the overview, topic and search pages).
  const tags = new Set<string>();
  if (slug) {
    tags.add(storyTag(slug));
    const folder = slug.includes('/') ? slug.split('/')[0] : '';
    if (folder) {
      tags.add(listTag(folder));
    }
    if (folder === 'global-settings') {
      tags.add(GLOBAL_SETTINGS_TAG);
    }
  } else {
    // Payloads without a full_slug cannot be targeted; purge everything.
    tags.add(STORYBLOK_TAG);
  }

  // Next.js 16 requires a cache profile; expire immediately so the
  // affected data cache entries are refetched on the next request.
  tags.forEach(tag => revalidateTag(tag, { expire: 0 }));

  return NextResponse.json({
    revalidated: true,
    action: payload.action ?? null,
    slug: slug ?? null,
    tags: [...tags],
  });
}

function isValidSignature(rawBody: string, signature: string, secret: string) {
  const expected = createHmac('sha1', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

function matchesSecret(provided: string | null, secret: string) {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

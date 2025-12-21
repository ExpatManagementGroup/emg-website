import { notFound } from 'next/navigation';

/**
 * Microsoft Exchange/Outlook autodiscover endpoint
 * Email clients probe this to configure email accounts
 * Returns 404 since we don't host Exchange email services
 * 
 * Note: Using notFound() to show custom 404 page for better UX
 * Email clients will still receive proper HTTP 404 status
 */
export async function GET() {
  // Show custom 404 page (still returns HTTP 404 status for email clients)
  notFound();
}


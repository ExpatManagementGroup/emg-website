import { notFound } from 'next/navigation';

/**
 * Apple App Store Connect traffic advice endpoint
 * Apple crawls this to verify app privacy information
 * Returns 404 if not providing app privacy info, or appropriate JSON if you are
 * 
 * Note: Using notFound() to show custom 404 page for better UX
 * Automated crawlers will still receive proper HTTP 404 status
 */
export async function GET() {
  // Show custom 404 page (still returns HTTP 404 status for crawlers)
  notFound();
  
  // If you have app privacy info in the future, return JSON like this:
  // return NextResponse.json({
  //   "applinks": {
  //     "apps": [],
  //     "details": []
  //   }
  // });
}


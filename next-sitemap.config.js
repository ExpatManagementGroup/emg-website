/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.expatmanagementgroup.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/404'],
  // ...other options
}
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
	},
	images: {
		domains: [
			'localhost',
			'lh3.googleusercontent.com',
			'w7.pngwing.com',
			'img.etimg.com',
			'wac-cdn.atlassian.com',
			'dwpdigital.blog.gov.uk'
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:4200/api/:path*'
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4200/uploads/:path*'
			}
		]
	}
}

module.exports = nextConfig

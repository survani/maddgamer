/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		domains: ["cdn.cloudflare.steamstatic.com", "i.ibb.co"],
	},
};

module.exports = nextConfig;

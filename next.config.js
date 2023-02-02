/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		domains: ["pbs.twimg.com", "www.callofduty.com"],
	},
};

module.exports = nextConfig;

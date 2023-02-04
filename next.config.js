/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		domains: [
			"pbs.twimg.com",
			"www.callofduty.com",
			"crossfirex.akamaized.net",
			"turtlerockstudios.com",
		],
	},
};

module.exports = nextConfig;

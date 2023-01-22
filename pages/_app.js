import { Analytics } from "@vercel/analytics/react";
import { NextSeo } from "next-seo";
import React from "react";
import { Layout } from "../components";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<NextSeo
				title='MaddGamer'
				titleTemplate='MaddGamer'
				defaultTitle='MaddGamer'
				description='Covering all the latest gaming news!'
				canonical='https://www.maddgamer.com/'
				openGraph={{
					type: "website",
					locale: "en_IE",
					siteName: "MaddGamer",
					url: "https://www.maddgamer.com/",
					title: "MaddGamer",
					description: "Covering all the latest gaming news!",
					images: [
						{
							url: "/public/favicon.ico",
							width: 800,
							height: 600,
							alt: "MaddGamer",
						},
					],
					siteName: "MaddGamer",
				}}
				twitter={{
					handle: "@maddgamernews",
					site: "@maddgamernews",
					cardType: "summary_large_image",
				}}
			/>
			<Component {...pageProps} />
			<Analytics />
		</Layout>
	);
}

export default MyApp;

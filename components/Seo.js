import { NextSeo } from "next-seo";
import React from "react";

const Seo = ({ post }) => {
	return (
		<NextSeo
			title={post.title}
			titleTemplate={post.title}
			defaultTitle={post.title}
			description={post.excerpt}
			openGraph={{
				type: "website",
				locale: "en_IE",
				siteName: "MaddGamer",
				url: "https://www.maddgamer.com/",
				title: "MaddGamer",
				description: "Covering all the latest gaming news!",
				images: [
					{
						url: `${post.featuredImage.url}`,
						width: 800,
						height: 600,
						alt: "MaddGamer",
						type: "image/jpeg",
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
	);
};

export default Seo;

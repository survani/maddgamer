import { NextSeo } from "next-seo";
import { title } from "process";
import React from "react";

const Seo = ({ post }) => {
	const titles = `MaddGamer - ${post.title}`;
	console.log(titles);

	return (
		<NextSeo
			title={titles}
			titleTemplate={titles}
			defaultTitle={titles}
			description={post.excerpt}
			openGraph={{
				type: "website",
				locale: "en_IE",
				siteName: titles,
				url: "https://www.maddgamer.com/",
				title: titles,
				description:
					"Covering everything related to the Call of Duty franchise!",
				images: [
					{
						url: post.featuredImage.url,
						width: 1200,
						height: 630,
						alt: "MaddGamer Call of Duty News",
						type: "image/webp",
					},
				],
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

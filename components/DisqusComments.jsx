import { DiscussionEmbed } from "disqus-react";
import React from "react";

const DisqusComments = ({ post }) => {
	const disqusShortname = "maddgamer";
	const disqusConfig = {
		url: `https://maddgamer.com/${post.slug}`,
		identifier: post.id,
		title: post.title,
	};
	return (
		<>
			<h2 className='text-white mt-10 mb-4 text-xl font-semibold'>
				Share What You Think?
			</h2>
			<section className='bg-white p-10 rounded-lg shadow-lg'>
				<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
			</section>
		</>
	);
};

export default DisqusComments;

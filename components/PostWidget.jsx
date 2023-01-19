import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import { grpahCMSImageLoader } from "../util";

const PostWidget = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		if (slug) {
			getSimilarPosts(categories, slug).then((result) => {
				setRelatedPosts(result);
			});
		} else {
			getRecentPosts().then((result) => {
				setRelatedPosts(result);
			});
		}
	}, [slug]);

	return (
		<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
			<h3 className='text-xl mb-5 font-semibold border-b pb-4'>
				{slug ? "Related Posts" : "Recent Posts"}
			</h3>
			{relatedPosts.map((post, index) => (
				<div key={index} className='flex items-center w-full mb-4'>
					<div className='w-16 flex-none'>
						<Image
							loader={grpahCMSImageLoader}
							alt={post.title}
							height='100'
							width='100'
							unoptimized
							className='rounded h-16 w-full object-cover'
							src={post.featuredImage.url}
						/>
					</div>
					<div className='flex-grow ml-4'>
						<Link href={`/post/${post.slug}`} className='text-md' key={index}>
							{post.title}
						</Link>
						<p className='text-gray-500 font-xs mb-1'>
							{moment(post.createdAt).format("MMM DD, YYYY")}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;

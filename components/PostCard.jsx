import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { grpahCMSImageLoader } from "../util";

const PostCard = ({ post }) => {
	return (
		<>
			{/* <Link href={`/post/${post.slug}`}> */}
			<div className='bg-white shadow-lg rounded-lg p-0 lg:p-5 pb-10 mb-8'>
				<div className='relative overflow-hidden shadow-md pb-80 mb-6'>
					<Link href={`/post/${post.slug}`}>
						<img
							src={post.featuredImage.url}
							alt=''
							className='object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg'
						/>
					</Link>
					<p className='absolute w-1/2 py-1 top-0 left-0 rounded-tl-lg text-center text-md bg-blue-600 text-white lg:w-1/3 lg:text-xl'>
						{post.subline}
					</p>
					<span className='absolute p-2 bg-slate-800 top-[18rem] left-0 text-white text-sm rounded-bl-lg'>
						{moment(post.createdAt).format("MMM DD, YYYY")}
					</span>
				</div>
				<h1 className='transition duration-700 px-2 mb-3 cursor-pointer hover:text-blue-700 text-[20px] md:text-[24px] lg:text-[32px] font-semibold'>
					<Link href={`/post/${post.slug}`}>{post.title}</Link>
				</h1>

				<p className='text-sm text-gray-700 font-normal px-2 mb-1 lg:text-lg'>
					{post.excerpt}
				</p>
			</div>
			{/* </Link> */}
		</>
	);
};
export default PostCard;

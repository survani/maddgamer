import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { grpahCMSImageLoader } from "../util";

const PostCard = ({ post }) => {
	return (
		<>
			<Link href={`/post/${post.slug}`}>
				<div className='bg-white shadow-lg rounded-lg p-0 lg:p-5 pb-10 mb-8'>
					<div className='relative overflow-hidden shadow-md pb-80 mb-6'>
						<Link href={`/post/${post.slug}`}>
							<img
								src={post.featuredImage.url}
								alt=''
								className='object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg'
							/>
						</Link>
						<p className='absolute w-1/3 py-1 top-0 left-0 rounded-tl-lg text-center text-xl bg-blue-600 text-white'>
							{post.subline}
						</p>
					</div>

					<h1 className='transition duration-700 text-center mb-1 cursor-pointer hover:text-blue-700 text-[20px] md:text-[24px] lg:text-[32px] font-semibold'>
						<Link href={`/post/${post.slug}`}>{post.title}</Link>
					</h1>
					<div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
						<div className='font-medium text-gray-700'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 inline mr-2 text-pink-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							<span className='align-middle'>
								{moment(post.createdAt).format("MMM DD, YYYY")}
							</span>
						</div>
					</div>
					<p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-1'>
						{post.excerpt}
					</p>
				</div>
			</Link>
		</>
	);
};
export default PostCard;

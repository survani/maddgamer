import moment from "moment";
import React, { useState } from "react";
import readingTime from "reading-time";
//sanitizes html data keeps the site safe don't delete
import xss from "xss";

const PostDetail = ({ post }) => {
	//gives us the time it takes to read each article.
	const howLongToRead = readingTime(post.content.html);
	return (
		<>
			<div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
				<h1 className='mb-2 text-2xl font-semibold p-5 lg:mb-3 lg:text-3xl lg:p-1'>
					{post.title}
				</h1>
				<div className='font-medium text-gray-700 flex'>
					<p className=' p-2 bg-slate-800 text-white text-sm rounded-md mr-2'>
						{moment(post.createdAt).format("MMM DD, YYYY")}
					</p>
					<p className='p-2 bg-slate-800 text-white text-sm rounded-md m-1/2'>
						{howLongToRead.text}
					</p>
				</div>
				<div className='relative overflow-hidden shadow-md mb-6'>
					<img
						src={post.featuredImage.url}
						alt=''
						className='object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg'
					/>
				</div>
				<div className='px-4 lg:px-0'>
					<div
						dangerouslySetInnerHTML={{
							__html: xss(post.content.html),
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default PostDetail;

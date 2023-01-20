import Link from "next/link";
import React from "react";

const TopHeader = () => {
	return (
		<div className='bg-white hidden lg:flex justify-center'>
			<p className='mb-0 lg:ml-10 md:ml-10 text-sm lg:text-[14px]'>
				<Link
					href='https://www.maddgamer.com/post/mw2-and-warzone-20-season-2-delayed-plus-more'
					className='hover:text-blue-800 hover:underline'
				>
					MW2 and Warzone 2.0 Season 2 Releases Feb 15, 2023
				</Link>
				<Link
					href='https://www.maddgamer.com/post/video-game-releases-2023-all-platforms'
					className='hover:text-blue-800 hover:underline ml-2'
				>
					<span className='hover:no-underline text-black'>| </span> Video Game
					Releases 2023
				</Link>
			</p>
		</div>
	);
};

export default TopHeader;

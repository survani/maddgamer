import Link from "next/link";
import React from "react";

const TopHeader = () => {
	return (
		<section className='d-none mx-2 bg-light d-lg-flex justify-content-center'>
			<p className='fw-bold mx-2'>Highlight -</p>
			<Link href='https://www.maddgamer.com/blog/our-most-anticipated-shooter-games-list-2023'>
				<p>Most Anticipated Shooter Games 2023</p>
			</Link>
			<span className='mx-2'> | </span>
			<Link href='https://www.maddgamer.com/blog/mw2-and-warzone-20-all-season-2-updates'>
				<p>MW2 and Warzone 2.0 All Season 2 Updates</p>
			</Link>
		</section>
	);
};

export default TopHeader;

import Link from "next/link";
import React from "react";

const TopHeader = () => {
	return (
		<div className='bg-white hidden lg:flex justify-center'>
			<p className='mb-0 lg:ml-10 md:ml-10 text-sm lg:text-[14px]'>
				Welcome to the <span className='text-blue-900 font-semibold'>#1</span>{" "}
				source for the Call of Duty franchise!
			</p>
		</div>
	);
};

export default TopHeader;

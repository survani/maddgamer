import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategories } from "../services";
import TopHeader from "./TopHeader";

const Header = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then((newCategories) => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className='mb-8 bg-blue-900'>
			<TopHeader />
			<div className='flex flex-row items-center justify-center lg:justify-between w-full lg:w-3/4 md:w-4/5 m-auto py-2 '>
				<Link href='/'>
					<img src='/MDGLogo.png' className='h-10' />
				</Link>
				<div className='lg:flex hidden md:block text-sm lg:text-[16px]'>
					{categories.map((category, index) => (
						<Link key={index} href={`/category/${category.slug}`}>
							<span className='md:float-right mt-3 text-white ml-4 font-semibold cursor-pointer'>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Header;

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
		<div className='mb-8'>
			<TopHeader />
			<div className='flex flex-row items-center w-full justify-center p-2 bg-blue-900'>
				<Link href='/'>
					<h1 className='font-Manrope text-white font-extrabold text-5xl'>
						MDG
					</h1>
				</Link>
				<div className='flex hidden lg:block'>
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

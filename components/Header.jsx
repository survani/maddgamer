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
		<div className='container-xl w-full mx-auto mb-8'>
			<TopHeader />
			<div className=' w-full inline-block py-4 px-10 bg-blue-900'>
				<div className='md:float-left block'>
					<Link href='/'>
						<img
							src='maddgamerlogo.webp'
							className='cursor-pointer w-[120px]'
						/>
					</Link>
				</div>
				<div className='hidden md:float-left md:contents'>
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

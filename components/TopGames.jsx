import axios from "axios";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const NEXT_PUBLIC_RAWG_API = process.env.NEXT_PUBLIC_RAWG_API;
const TopGames = () => {
	const [topGames, setTopGames] = useState([]);

	useEffect(() => {
		axios.get(`${NEXT_PUBLIC_RAWG_API}`).then((response) => {
			setTopGames(response.data.results);
		});
	}, []);

	return (
		<>
			<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
				<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
					Warzone Maps
				</h3>
				<div className='flex items-center object-contain'>
					<Image
						className='rounded-lg'
						src='/W2.0.webp'
						alt='Ashika Island'
						width={150}
						height={500}
					/>
					<div className='ml-5'>
						<p className='mb-0'>
							<span className='font-semibold'>Name:</span> Ashika Island
						</p>
						<p className='mb-0'>
							<span className='font-semibold'>Mode:</span> Resurgance
						</p>
						<p className='mb-0'>
							<span className='font-semibold'>Season:</span> 2
						</p>
					</div>
				</div>
				<div className='flex items-center mt-5 '>
					<Image
						className='rounded-lg'
						src='/Warzone.webp'
						alt='Al Mazrah'
						width={150}
						height={100}
					/>
					<div className='ml-5'>
						<p className='mb-0'>
							<span className='font-semibold'>Name:</span> Al Mazrah
						</p>
						<p className='mb-0'>
							<span className='font-semibold'>Mode:</span> Main
						</p>
						<p className='mb-0'>
							<span className='font-semibold'>Season:</span> 1 & 2
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopGames;

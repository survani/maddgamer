import axios from "axios";
import moment from "moment/moment";
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
					Upcoming Games
				</h3>
				{topGames.map((game, index) => (
					<div key={index} className='flex items-center w-full mb-4'>
						<div className='w-16 flex-none'>
							<img
								alt={game.name}
								className='rounded h-14 w-full object-cover'
								src={game.background_image}
							/>
						</div>
						<div className='flex-grow ml-4'>
							<h6 className='text-blue-900 font-semibold'>{game.name}</h6>
							<p className='text-gray-500 font-xs'>
								{moment(game.released).format("MMM DD, YYYY")}
							</p>
						</div>
					</div>
				))}
				<p>
					Powered by:{" "}
					<Link href='https://rawg.io/apidocs' className='font-semibold'>
						RAWG
					</Link>
				</p>
			</div>
		</>
	);
};

export default TopGames;

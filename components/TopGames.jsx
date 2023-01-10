import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
const NEXT_PUBLIC_RAWG_API = process.env.NEXT_PUBLIC_RAWG_API;
const TopGames = () => {
	const [topGames, setTopGames] = useState([]);

	useEffect(() => {
		axios.get(`${NEXT_PUBLIC_RAWG_API}`).then((response) => {
			console.log("topgames", response.data.results);
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
							<h6>{game.name}</h6>
							<p className='text-gray-500 font-xs'>
								{moment(game.released).format("MMM DD, YYYY")}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default TopGames;

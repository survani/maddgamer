import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const GameDeals = () => {
	const [gameDeals, setGameDeals] = useState([]);
	const GAME_DEALS_API =
		"https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=5;";

	useEffect(() => {
		axios.get(`${GAME_DEALS_API}`).then((response) => {
			setGameDeals(response.data);
		});
	}, []);

	return (
		<>
			<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
				<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
					Steam Game Deals
				</h3>
				{gameDeals.map((game, index) => (
					<div key={index} className='flex items-center w-full mb-4'>
						<div className='w-16 flex-none'>
							<img
								alt={game.title}
								className='rounded h-14 w-full object-cover'
								src={game.thumb}
							/>
						</div>
						<div className='flex-grow ml-4'>
							<h6 className='text-blue-900 font-semibold'>{game.title}</h6>
							<p className='text-gray-500 font-xs '>
								<span className='font-semibold'>${game.salePrice}</span>
								<span className='ml-3 line-through	'>{game.normalPrice}</span>
							</p>
						</div>
					</div>
				))}
				<p>
					Powered by:{" "}
					<Link
						href='https://apidocs.cheapshark.com/'
						className='font-semibold'
					>
						CheapShark
					</Link>
				</p>
			</div>
		</>
	);
};

export default GameDeals;

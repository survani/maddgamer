import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlurImage from "./BlurImage";

const Sales = () => {
	const [deals, setDeals] = useState([]);

	const callAPI = async () => {
		try {
			axios
				.get("https://www.cheapshark.com/api/1.0/deals?storeID=1")
				.then((response) => {
					console.log(response.data);
					setDeals(response.data);
				});
		} catch {
			console.log("ERROR");
		}
	};

	useEffect(() => {
		callAPI();
	}, []);

	return (
		<>
			<section className='container'>
				<div className='section-title'>
					<p className='title h3 mb-3 mt-4'>Steam Deals</p>
					<div className='card-container'>
						{deals.splice(0, 12).map((deal, index) => (
							<Link
								href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
							>
								<div className='deal-card' key={index}>
									<BlurImage
										className='deal-img'
										src={deal.thumb}
										alt={deal.title}
										width='300'
										height='300'
									/>
									<div className='card-info-container mx-2'>
										<p className='deals-title'>{deal.title}</p>
										<div className='d-flex '>
											<p className='me-2 font-weight-bold'>${deal.salePrice}</p>
											<p className='text-decoration-line-through text-muted'>
												${deal.normalPrice}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Sales;

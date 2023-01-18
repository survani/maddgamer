import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const NEXT_PUBLIC_NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;

const OtherNews = () => {
	const [otherNews, setOtherNews] = useState([]);

	useEffect(() => {
		axios.get(`${NEXT_PUBLIC_NEWS_API}`).then((response) => {
			//only shows 5 articles
			response.data.articles.splice(5);
			console.log(response.data.articles);
			setOtherNews(response.data.articles);
		});
	}, []);

	return (
		<>
			<section className='bg-white shadow-lg rounded-lg p-0 lg:p-10 pb-5'>
				<p className='text-2xl font-semibold text-center lg:text-start mb-5'>
					Around The World
				</p>
				<div className='lg:flex'>
					{otherNews.map((news) => (
						<div className='mr-5'>
							<Link href={news.url}>
								<img
									className='object-top h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-t-lg'
									src={news.urlToImage}
								/>
								<p className='w-full py-1 rounded-bl-lg rounded-br-lg text-center text-xl bg-blue-600 text-white mb-3'>
									{news.source.name}
								</p>
								<p className='transition duration-700 text-center mb-1 cursor-pointer hover:text-blue-700 text-[20px] md:text-[24px] lg:text-[16px] font-semibold'>
									{news.title}
								</p>
							</Link>
						</div>
					))}
				</div>
				<div className='mt-10'>
					<p className='text-center'>
						This articles are powered by
						<Link href='https://newsapi.org/docs/endpoints/everything'>
							<span className='font-semibold'> NewsAPI</span>
						</Link>
					</p>
				</div>
			</section>
		</>
	);
};

export default OtherNews;

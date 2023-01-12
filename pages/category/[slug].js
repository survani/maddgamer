import { useRouter } from "next/router";
import React from "react";

import { Categories, Loader, PostCard } from "../../components";
import { getCategories, getCategoryPost } from "../../services";

const CategoryPost = ({ posts }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader />;
	}

	console.log("what we got here", posts.node);

	return (
		<div className='container mx-auto px-10 mb-8'>
			{/* I WILL ADD THIS LATER */}
			{/* <div className=' bg-white mb-5 p-5 rounded-md'>
				<h4 className='text-blue-900 font-semibold text-2xl'>PC News</h4>
			</div> */}
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				<div className='col-span-1 lg:col-span-8'>
					{posts.map((post, index) => (
						<PostCard key={index} post={post.node} />
					))}
				</div>
				<div className='col-span-1 lg:col-span-4'>
					<div className='relative lg:sticky top-8'>
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
	const posts = await getCategoryPost(params.slug);

	return {
		props: { posts },
		revalidate: 5,
	};
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
	const categories = await getCategories();
	return {
		paths: categories.map(({ slug }) => ({ params: { slug } })),
		fallback: true,
	};
}

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Post from "@/components/Post";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";

const FeaturedPosts = ({ posts, authors }) => {
	// Featured Posts
	const featuredPosts = posts.filter((post) => {
		if (post.frontMatter.featured === true) return post;
	});

	return (
		<Layout metaTitle='Featured News'>
			<PageHeader title='Featured News' />

			<section className='section pt-0'>
				<div className='container'>
					<div className='row gy-5 gx-4 g-xl-5'>
						{featuredPosts.map((post, i) => (
							<div key={i} className='col-lg-4 col-md-6'>
								<Post post={post} authors={authors} />
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default FeaturedPosts;

// Export Props
export const getStaticProps = () => {
	return {
		props: {
			posts: getPosts(),
			authors: getAuthors(),
		},
	};
};

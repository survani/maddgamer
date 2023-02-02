import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { formatDate } from "@/utils/formatDate";
import {
	ArrowRight,
	ArrowUpRight,
	Calender,
	Clock,
	EditCircle,
} from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import { sortArrayByCount } from "@/utils/sortArrayByCount";
import Link from "next/link";

const Home = ({ homepage, posts, authors }) => {
	const { banner, featuredPost, allCategories, recentPost, topAuthor } =
		homepage.frontMatter;

	// Featured Posts
	const featuredPosts = posts.filter(
		(post) => post.frontMatter.featured === true
	);

	// Post of the Month
	const postOfTheMonth = posts.filter((post) => {
		if (post.frontMatter.postOfTheMonth === true) return post;
	});

	// Post Categories
	const allCategory = posts.map((category) => category.frontMatter.categories);
	const flatCategory = allCategory.flat();
	const uniqueCategory = sortArrayByCount(flatCategory);

	// Top Authors
	const allAuthor = posts.map((author) => author.frontMatter.author);
	const sortedAuthor = sortArrayByCount(allAuthor);
	const topAuthors = sortedAuthor.map((x) => {
		const allAuthors = authors.find((y) => {
			if (x.value == y.authorFrontMatter.title) {
				return y.authorFrontMatter.title;
			}
		});
		return allAuthors;
	});

	// Post Count by Author
	const postCount = [];
	allAuthor.forEach((x) => {
		postCount[x] = (postCount[x] || 0) + 1;
	});

	// Post per Page
	const postPerPage = Math.ceil(posts.length / siteConfig.postPerPage);

	return (
		<Layout>
			{/* Banner */}
			<section className='banner bg-white overflow-hidden'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 position-relative text-center'>
							<h1 className='title display-4 d-inline mb-0'>
								<BannerShape />
								<ParseMarkdown content={banner.title} />
							</h1>

							<ParseMarkdown
								tagName='p'
								className='lead mt-4 mb-0'
								content={banner.subtitle}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Posts */}
			<section className='featured-posts section'>
				<div className='container'>
					<div className='row align-items-center section-title'>
						<div className='col-sm-7'>
							<ParseMarkdown
								tagName='h2'
								className='h3 mb-0 title'
								content={featuredPost.title}
							/>
						</div>
						<div className='col-sm-5 text-end d-none d-sm-block'>
							<Link href='/featured/' className='text-link lead active'>
								<ParseMarkdown content={featuredPost.linkLabel} />
								<ArrowUpRight />
							</Link>
						</div>
					</div>
					<div className='row gy-5 gx-md-5'>
						<div className='col-lg-4 col-md-6 order-0'>
							<Post post={featuredPosts[0]} authors={authors} />
						</div>
						<div className='col-lg-4 col-md-12 order-2 order-lg-1'>
							<div className='row gx-0 gx-md-5 gx-lg-0 gy-5'>
								<div className='col-lg-12 col-md-6'>
									<Post
										post={featuredPosts[1]}
										authors={authors}
										compact={true}
									/>
								</div>
								<div className='col-lg-12 col-md-6'>
									<Post
										post={featuredPosts[2]}
										authors={authors}
										compact={true}
									/>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6 order-1 order-lg-2'>
							<Post post={featuredPosts[3]} authors={authors} />
						</div>
					</div>
					<div className='d-block d-sm-none mt-5 pt-3'>
						<div className='text-center'>
							<Link href='/featured/' className='text-link lead active'>
								<ParseMarkdown content={featuredPost.linkLabel} />
								<ArrowUpRight />
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* All Categories */}
			<section className='section bg-white'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-10 mx-auto'>
							<div className='section-title text-center'>
								<ParseMarkdown
									tagName='h2'
									className='h3 mb-2 title'
									content={allCategories.title}
								/>
								<ParseMarkdown
									tagName='p'
									className='mb-0'
									content={allCategories.subtitle}
								/>
							</div>

							<div className='row row g-3 taxonomy-lists'>
								{uniqueCategory.slice(0, 9).map((item, i) => (
									<div className='col-md-4 col-6' key={i}>
										<Link
											href={`/categories/${slugify(item.value)}`}
											className='bg-body text-dark px-3 py-2 d-flex lead'
										>
											<div className='flex-grow-1'>
												<span className='text-black'>
													{item.value} <small>({item.count})</small>
												</span>
											</div>
											<div className='flex-shrink-0 ms-2 icon'>
												<ArrowRight className='opacity-25 small' size={20} />
											</div>
										</Link>
									</div>
								))}
							</div>
							<div className='text-center mt-5'>
								<Link href='/categories/' className='text-link lead active'>
									<ParseMarkdown content='All Categories' />
									<ArrowUpRight />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Posts */}
			<section className='section'>
				<div className='container'>
					<div className='row align-items-center section-title'>
						<div className='col-sm-7'>
							<ParseMarkdown
								tagName='h2'
								className='h3 mb-0 title'
								content={recentPost.title}
							/>
						</div>
						<div className='col-sm-5 text-end d-none d-sm-block'>
							<Link href='/blog/' className='text-link lead active'>
								<ParseMarkdown content={recentPost.linkLabel} />
								<ArrowUpRight />
							</Link>
						</div>
					</div>
					<div className='row gy-5 gx-md-5'>
						{posts.slice(0, 6).map((post, i) => (
							<div key={i} className='col-lg-4 col-md-6'>
								<Post post={post} authors={authors} />
							</div>
						))}

						<div className='col-12 text-center pt-4 mt-5'>
							<Pagination currentPage={1} numberOfPages={postPerPage} />
						</div>
					</div>
				</div>
			</section>

			{/* Top Authors */}
			{/* <section className='section bg-white'>
				<div className='container'>
					<div className='row align-items-center section-title'>
						<div className='col-sm-7'>
							<ParseMarkdown
								tagName='h2'
								className='h3 mb-0 title'
								content={topAuthor.title}
							/>
						</div>
						<div className='col-sm-5 text-end d-none d-sm-block'>
							<Link href='/author/' className='text-link lead active'>
								<ParseMarkdown content={topAuthor.linkLabel} />
								<ArrowUpRight />
							</Link>
						</div>
					</div>
					<div className='row gy-5 gx-md-5'>
						{topAuthors.slice(0, 3).map((author, i) => (
							<div className='col-lg-4 col-md-6' key={i}>
								<Link
									href={`/author/${author.authorSlug}`}
									className='bg-body text-dark p-3 d-flex is-hoverable'
									title={author.authorFrontMatter.title}
								>
									<div className='flex-shrink-0 me-3'>
										<BlurImage
											className='shadow img-fluid'
											src={author.authorFrontMatter.image}
											alt={author.authorFrontMatter.title}
											width='90'
											height='90'
										/>
									</div>
									<div className='flex-grow-1'>
										<div className='d-flex flex-column h-100'>
											<div>
												<h3 className='h4 text-dark mb-1 line-clamp clamp-1'>
													{author.authorFrontMatter.title}
												</h3>
												<p className='mb-2 lh-1 line-clamp clamp-1'>
													{author.authorFrontMatter.subtitle}
												</p>
											</div>
											<p className='fw-medium mt-auto mb-0 small'>
												<EditCircle className='me-2' />
												<span className='text-black'>
													{postCount[author.authorFrontMatter.title] < 9
														? "0" + postCount[author.authorFrontMatter.title]
														: postCount[author.authorFrontMatter.title]}
												</span>{" "}
												Published posts
											</p>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
					<div className='d-block d-sm-none mt-5 pt-3'>
						<div className='text-center'>
							<Link href='/author/' className='text-link lead active'>
								<ParseMarkdown content={topAuthor.linkLabel} />
								<ArrowUpRight />
							</Link>
						</div>
					</div>
				</div>
			</section> */}

			{/* Post of the Month */}
			{postOfTheMonth.slice(0, 1).map((post, i) => (
				<section
					key={i}
					className='post-of-the-month mt-5'
					style={{
						backgroundImage: `url(${post.frontMatter.image})`,
					}}
				>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-7 col-lg-8 col-md-10 mx-auto text-center'>
								<div className='mb-5 pb-4'>
									<h2 className='text-uppercase h6 text-black bg-white mb-0 d-inline-block px-3 py-2 lh-1'>
										POST OF THE WEEK
									</h2>
								</div>

								<ul className='post-meta list-inline mb-4 text-light'>
									<li className='list-inline-item'>
										<Calender className='me-1 align-bottom' />
										{formatDate(post.frontMatter.date)}
									</li>
									<li className='list-inline-item'>•</li>
									<li className='list-inline-item'>
										<Clock className='me-1 align-bottom' />
										{readingTime(post.content)} min read
									</li>
								</ul>

								<h3 className='h2 post-title mb-4 position-relative'>
									<Link
										className='text-white text-link stretched-link'
										href={`/blog/${post.slug}`}
									>
										{post.frontMatter.title}
									</Link>
								</h3>
								{/* ADD AUTHOR IF WE WANT */}
								{/* <div className='post-author'>
									<Link
										href={`/author/${slugify(post.frontMatter.author)}`}
										className='is-hoverable'
										title={`Read all posts by - ${post.frontMatter.author}`}
									>
										{authors.map(
											(authorPage, key) =>
												slugify(post.frontMatter.author) ===
													authorPage.authorSlug && (
													<BlurImage
														key={key}
														src={authorPage.authorFrontMatter.image}
														alt={post.frontMatter.author}
														className='w-auto me-3'
														width='26'
														height='26'
													/>
												)
										)}
									</Link>
									<span className='text-light me-1'>by </span>
									<Link
										className='text-link text-white'
										href={`/author/${slugify(post.frontMatter.author)}`}
										title={`Read all posts by - ${post.frontMatter.author}`}
									>
										{post.frontMatter.author}
									</Link>
								</div> */}
							</div>
						</div>
					</div>
				</section>
			))}
		</Layout>
	);
};
export default Home;

// Export Props
export const getStaticProps = () => {
	return {
		props: {
			homepage: getSinglePage("content/_index.md"),
			posts: getPosts(),
			authors: getAuthors(),
		},
	};
};

// BannerShape
export const BannerShape = () => {
	return (
		// prettier-ignore
		<svg className="shape text-primary" width="46" height="50" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15 46A91.9 91.9 0 0 0 2 43.8c-1-.1-1.8.5-1.9 1.5-.1.9.6 1.7 1.4 1.8a87 87 0 0 1 12.7 2.3c.9.3 1.8-.2 2.1-1.1.3-1-.3-1.9-1.1-2.1ZM28.1 29c-7-7-14.7-13.2-21.5-20.5-.6-.7-1.7-.7-2.3 0-.7.6-.8 1.6-.1 2.3C11 18 18.8 24.2 25.7 31.3c.7.7 1.7.7 2.4 0 .6-.6.7-1.7 0-2.3ZM41 1.8l.7 12.1c0 1 .8 1.7 1.7 1.6 1 0 1.6-.8 1.6-1.7l-.6-12.2c0-1-.8-1.6-1.8-1.6-.8 0-1.6.9-1.5 1.8Z" fill="currentColor"/></svg>
	);
};

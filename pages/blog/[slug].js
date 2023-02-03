import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import SharePost from "@/components/SharePost";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { getRelatedPosts } from "@/libs/getRelatedPosts";
import { useScript } from "@/libs/useScript";
import { formatDate } from "@/utils/formatDate";
import { ArrowUpRight, Calender, Clock } from "@/utils/Icons";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import Link from "next/link";

// Marked & Highlight JS
import hljs from "highlight.js";
import "highlight.js/scss/base16/dracula.scss";
import { marked } from "marked";

export default function PostPage({
	allPosts,
	allAuthors,
	authorImage,
	currentPost: { slug, frontMatter, content },
}) {
	// Get Page Url
	const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;

	const { title, author, date, image, description, tags, categories } =
		frontMatter;

	// Marked Options
	marked.setOptions({
		langPrefix: "hljs language-",
		highlight: function (code) {
			return hljs.highlightAuto(code).value;
		},
	});

	// Get first 3 related posts
	let relatedPosts = getRelatedPosts(allPosts, slug, tags, categories);

	// If Related posts are less then 3
	const recentPosts = allPosts
		.filter((post) => post.slug !== slug)
		.slice(0, 3 - relatedPosts.length);

	return (
		<Layout metaTitle={title} metaDescription={description} ogImage={image}>
			<section className='bg-body'>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className=''>
							<div className='section pb-0'>
								<h1 className='article-title mb-3 text-[50px]'>{title}</h1>
								<p className='mb-4 pb-1 text-lg'>{description}</p>

								<div className='post-author d-flex flex-wrap align-items-center'>
									{/* <p className='mb-0 me-3 lh-base'>
										<Link
											href={`/author/${slugify(author)}`}
											className='is-hoverable'
											title={`Read all posts by - ${author}`}
										>
											<BlurImage
												src={authorImage}
												alt={author}
												className='w-auto'
												width='26'
												height='26'
											/>
										</Link>
										<span className='ms-3 me-2'>by</span>
										<Link
											className='text-link'
											href={`/author/${slugify(author)}`}
											title={`Read all posts by - ${author}`}
										>
											{author}
										</Link>
									</p>
									<span className='me-3'>—</span> */}
								</div>
							</div>
						</div>

						{image && (
							<div className='col-lg-12'>
								<BlurImage
									className='w-100 h-auto '
									src={image}
									alt={title}
									width={`1020`}
									height={`660`}
								/>
								<div className='subline-info'>
									<p className='mb-4 text-muted mx-0'>
										<span
											className='d-inline-block'
											style={{ transform: "translateY(-2px)" }}
										>
											<Clock className='me-1' />
										</span>
										{readingTime(content)} min reading in
										<span className='mx-1'>—</span>
										{categories.map((category, i) => (
											<Link
												key={i}
												className='text-link mx-1'
												href={`/categories/${slugify(category)}`}
											>
												{category}
											</Link>
										))}
									</p>
									<span className='mx-2'>| </span>

									<p className='mb-0 lh-base'>
										<span
											className='d-inline-block'
											style={{ transform: "translateY(-2px)" }}
										>
											<Calender className='me-1' />
										</span>
										Published at {formatDate(date)}
									</p>
								</div>
							</div>
						)}

						<div className='col-xl-9 col-lg-10'>
							<div className={`section ${image == null ? "pt-0" : ""}`}>
								<div
									className='content'
									dangerouslySetInnerHTML={{
										__html: marked.parse(content),
									}}
								></div>

								<div className='d-block d-sm-flex justify-content-between align-items-center mt-5 pt-3'>
									<ul className='taxonomy-lists list-inline'>
										<li className='list-inline-item d-block mb-3'>Tags: </li>
										{tags.map((tag, i) => (
											<li key={i} className='list-inline-item'>
												<Link
													href={`/tags/${slugify(tag)}`}
													className='bg-white'
												>
													<span className='small me-1'>#</span>
													{tag}
												</Link>
											</li>
										))}
									</ul>

									<SharePost title={title} pageUrl={pageUrl} />
								</div>
							</div>

							<hr style={{ opacity: ".15" }} />
						</div>
					</div>

					<div className='section'>
						<div className='row align-items-center section-title'>
							<div className='col-sm-7'>
								<h2 className='h3 mb-0 title'>Keep Reading</h2>
							</div>
							<div className='col-sm-5 text-end d-none d-sm-block'>
								<Link href='/blog/' className='text-link lead active'>
									All Posts
									<ArrowUpRight />
								</Link>
							</div>
						</div>

						<div className='row gy-5 g-md-5'>
							{relatedPosts.map((post, key) => (
								<div key={key} className='col-lg-4 col-md-6'>
									<Post
										post={post}
										authors={allAuthors}
										compact={true}
										status='Related'
									/>
								</div>
							))}
							{recentPosts.map((post, key) => (
								<div key={key} className='col-lg-4 col-md-6'>
									<Post
										post={post}
										authors={allAuthors}
										compact={true}
										status='New'
									/>
								</div>
							))}
						</div>

						<div className='d-block d-sm-none mt-5 pt-3'>
							<div className='text-center'>
								<Link href='/blog/' className='text-link lead active'>
									All Posts
									<ArrowUpRight />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{useScript("/js/lightense.min.js", "body", true)}
		</Layout>
	);
}

export const getStaticPaths = async () => {
	const allPosts = getPosts();
	const paths = allPosts.map((post) => ({
		params: {
			slug: post.slug,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const allPosts = getPosts();
	const currentPost = allPosts.filter((post) => post.slug == slug);

	const allAuthors = getAuthors();
	const authorOfCurrentPost = allAuthors.filter(
		(author) => slugify(currentPost[0].frontMatter.author) == author.authorSlug
	);

	return {
		props: {
			currentPost: currentPost[0],
			authorImage: authorOfCurrentPost[0].authorFrontMatter.image,
			allPosts: allPosts,
			allAuthors: allAuthors,
		},
	};
};

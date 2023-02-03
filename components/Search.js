import BlurImage from "@/components/BlurImage";
import { AppContext } from "@/components/UseContext";
import { formatDate } from "@/utils/formatDate";
import { slugify } from "@/utils/slugify";
import { sortArrayByCount } from "@/utils/sortArrayByCount";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Search = () => {
	// Get All Posts from API
	const [allPosts, setAllPosts] = useState([]);
	useEffect(() => {
		const getResults = async () => {
			const res = await fetch("/api/search");
			const post = await res.json();
			const posts = JSON.parse(post);
			setAllPosts(posts);
		};
		getResults();
	}, []);

	// Get Post Tags
	const allTags = allPosts.map((tag) => tag.frontMatter.tags);
	const flatTags = allTags.flat();
	const uniqueTags = sortArrayByCount(flatTags);

	// Search Stuffs
	const { toggleSearch } = useContext(AppContext);
	const [searchOpen, setSearchOpen] = toggleSearch;
	const [searchTerm, setSearchTerm] = useState("");

	const searchResults = allPosts.filter((searchResult) => {
		if (searchTerm === "") {
			return "";
		} else if (
			searchResult.frontMatter.title.toLowerCase().includes(searchTerm) ||
			searchResult.frontMatter.description.toLowerCase().includes(searchTerm) ||
			searchResult.frontMatter.author.toLowerCase().includes(searchTerm) ||
			searchResult.frontMatter.tags[0].toLowerCase().includes(searchTerm) ||
			searchResult.frontMatter.categories[0].toLowerCase().includes(searchTerm)
		) {
			return searchResult;
		}
	});

	// search input focus
	searchOpen
		? setTimeout(() => {
				document.querySelector('[aria-label="search-query"]').focus();
		  }, 250)
		: null;

	const resetSearchInput = () => {
		setSearchOpen(!searchOpen);
		setSearchTerm("");
	};

	return (
		<>
			<div
				className={`search-overlay ${searchOpen ? `is-visible` : ``}`}
				onClick={() => resetSearchInput(true)}
			></div>
			<div
				className={`search-block overflow-auto bg-body ${
					searchOpen ? `is-visible` : `is-hidden`
				}`}
			>
				<div data-toggle='search-close' onClick={() => resetSearchInput(true)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='29'
						height='29'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<line x1='18' y1='6' x2='6' y2='18'></line>
						<line x1='6' y1='6' x2='18' y2='18'></line>
					</svg>
				</div>
				<input
					type='text'
					value={searchTerm}
					placeholder='Type to search blog..'
					onChange={(e) => {
						setSearchTerm(e.target.value.toLowerCase());
					}}
					aria-label='search-query'
				/>

				{searchResults.length ? (
					<>
						<p className='h4 my-4'>
							<span className='font-secondary'>{searchResults.length} </span>
							{searchResults.length > 1 ? "results" : "result"} found
						</p>
						<div className='search-results row g-3 gy-md-4'>
							{searchResults.map((r, i) => (
								<div
									key={i}
									className='col-6 col-sm-4'
									onClick={() => resetSearchInput(true)}
								>
									<Link href={`/blog/${r.slug}`}>
										<BlurImage
											className='mw-100 h-auto'
											src={r.frontMatter.image}
											alt={r.frontMatter.title}
											width='180'
											height='120'
										/>
										<span className='d-block mt-3 mb-2 text-muted date'>
											{formatDate(r.frontMatter.date)}
										</span>
										<p className='h5 mb-0 d-inline text-link line-clamp clamp-2'>
											{r.frontMatter.title}
										</p>
									</Link>
								</div>
							))}
						</div>
					</>
				) : searchTerm === "" ? (
					<></>
				) : (
					<div className='search-results row g-3 gy-md-4 pt-4'>
						<p className='h3 mt-3 mb-0'>No results found!</p>
					</div>
				)}

				<div className='mt-4 pt-2 is-hidden popular-topics'>
					<div className='section-title mb-3 pb-1'>
						<p className='title h4 mb-0'>Popular topics</p>
					</div>
					<ul className='taxonomy-lists list-unstyled d-flex flex-wrap gap-2'>
						{uniqueTags.slice(0, 13).map((item, i) => (
							<li
								key={i}
								className='d-inline-block'
								onClick={() => resetSearchInput(true)}
							>
								<Link
									href={`/tags/${slugify(item.value)}`}
									className='bg-white d-block'
								>
									{item.value} <sup>{item.count}</sup>
								</Link>
							</li>
						))}
						<li className='d-inline-block'>
							<Link
								className='border-0 pe-0 d-inline-flex align-items-center'
								href='/tags/'
							>
								All Topice
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='22'
									height='22'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<polyline points='9 6 15 12 9 18'></polyline>
								</svg>
							</Link>
						</li>
					</ul>
				</div>

				<div className='mt-4 pt-2 is-hidden recent-posts'>
					<div className='post-meta'>
						<div className='section-title mb-3 pb-1'>
							<p className='title h4 mb-0'>Recent posts</p>
						</div>
						<div className='row gy-4'>
							{allPosts.slice(0, 5).map((post, i) => (
								<div className='col-md-6' key={i}>
									<article className='row gx-3 align-items-start position-relative'>
										<div className='col-auto'>
											<BlurImage
												src={post.frontMatter.image}
												alt={post.frontMatter.title}
												width='75'
												height='75'
											/>
										</div>

										<div className='col'>
											{post.frontMatter.categories.map((category, i) => (
												<span
													key={i}
													className='d-block lh-1 mb-2 zIndexed line-clamp clamp-2'
												>
													<Link
														className='small lh-1 text-muted text-link'
														href={`/categories/${slugify(category)}`}
													>
														{category}
													</Link>
												</span>
											))}

											<Link
												className='fs-lg lh-base text-dark text-link stretched-link'
												href={post.slug}
											>
												{post.frontMatter.title}
											</Link>
										</div>
									</article>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Search;

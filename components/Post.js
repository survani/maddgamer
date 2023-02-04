import BlurImage from "@/components/BlurImage";
import { formatDate } from "@/utils/formatDate";
import { Calender, Clock } from "@/utils/Icons";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import { truncateString } from "@/utils/truncateString";
import Link from "next/link";

const Post = ({
	post: {
		slug,
		content,
		frontMatter: { title, image, date, author, description, extraInfo },
	},
	authors,
	compact,
	status,
}) => {
	return (
		<article className='bg-white d-flex flex-column h-100'>
			{!compact && (
				<div className='post-image'>
					<Link href={`/blog/${slug}`} className='d-block' title={title}>
						<p className='extra-info-text-inner-article'>{extraInfo}</p>
						<BlurImage
							className='w-100 h-auto'
							src={image}
							alt={title}
							width='368'
							height='238'
						/>
					</Link>
				</div>
			)}
			<div
				className={`p-4 ${authors != "current" ? "pb-10" : ""} ${
					status ? "position-relative" : ""
				}`}
			>
				{status && <p className='post-badge mb-0'>{status}</p>}
				<ul className={`post-meta list-inline mb-3 ${status ? "mt-3" : ""}`}>
					<li className='list-inline-item'>
						<Calender className='me-1 align-bottom' />
						{formatDate(date)}
					</li>
					<li className='list-inline-item'>•</li>
					<li className='list-inline-item'>
						<Clock className='me-1 align-bottom' />
						{readingTime(content)} min read
					</li>
				</ul>
				<div className='position-relative'>
					<h3 className='h4 post-title mb-2 line-clamp clamp-2'>
						<Link
							href={`/blog/${slug}`}
							className='text-link stretched-link'
							title={title}
						>
							{title}
						</Link>
					</h3>
					<p className={`mb-0 line-clamp ${compact ? "clamp-2" : "clamp-3"}`}>
						{truncateString(description, 150)}
					</p>
				</div>
			</div>
			{/* {authors != "current" &&
				(compact ? (
					<div className='post-author mt-auto p-4 pt-3'>
						<Link
							href={`/author/${slugify(author)}`}
							className='is-hoverable'
							title={`Read all posts by - ${author}`}
						>
							{authors.map(
								(authorPage, key) =>
									slugify(author) === authorPage.authorSlug && (
										<span className='d-inline-block' key={key}>
											<BlurImage
												src={authorPage.authorFrontMatter.image}
												alt={author}
												className='w-auto'
												width='26'
												height='26'
											/>
										</span>
									)
							)}
						</Link>
						<span className='ms-3 me-2'>by</span>
						<Link
							className='text-link'
							href={`/author/${slugify(author)}`}
							title={`Read all posts by - ${author}`}
						>
							{author}
						</Link>
					</div>
				) : (
					<div className='post-author d-flex mt-auto p-4'>
						<div className='flex-shrink-0'>
							<Link
								href={`/author/${slugify(author)}`}
								className='is-hoverable'
								title={`Read all posts by - ${author}`}
							>
								{authors.map(
									(authorPage, key) =>
										slugify(author) === authorPage.authorSlug && (
											<span className='d-inline-block rounded-circle' key={key}>
												<BlurImage
													src={authorPage.authorFrontMatter.image}
													alt={author}
													className='w-auto'
													width='42'
													height='42'
												/>
											</span>
										)
								)}
							</Link>
						</div>
						<div className='flex-grow-1 ms-3'>
							<p className='mb-0 lh-base small'>Written by</p>
							<Link
								className='text-link'
								href={`/author/${slugify(author)}`}
								title={`Read all posts by - ${author}`}
							>
								{author}
							</Link>
						</div>
					</div>
				))} */}
		</article>
	);
};
export default Post;

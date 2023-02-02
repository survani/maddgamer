import { ChevronLeft, ChevronRight } from "@/utils/Icons";
import Link from "next/link";

const Pagination = ({ currentPage, numberOfPages }) => {
	const isFirst = currentPage === 1;
	const isLast = currentPage === numberOfPages;

	return (
		<ul className='pagination justify-content-center'>
			<li
				className={`page-item ${
					isFirst || numberOfPages === 1 ? "disabled" : ""
				}`}
			>
				<Link
					href={`/blog/page/${currentPage - 1}`}
					className='page-link page-link-previous bg-transparent rounded-0 px-0 border-0 text-dark text-link text-uppercase fw-medium'
					aria-label='Pagination Arrow'
				>
					<ChevronLeft /> <span>Previous</span>
				</Link>
			</li>
			<li
				className='page-item page-count'
				title={`Page ${currentPage} of ${numberOfPages}`}
			>
				<span className='current-page'>{currentPage}</span>
				<span className='total-page'>{numberOfPages}</span>
			</li>
			<li
				className={`page-item ${
					isLast || numberOfPages === 1 ? "disabled" : ""
				}`}
			>
				<Link
					href={`/blog/page/${currentPage + 1}`}
					className='page-link bg-transparent rounded-0 px-0 border-0 text-dark text-link active text-uppercase fw-medium'
					aria-label='Pagination Arrow'
				>
					<span>Next</span> <ChevronRight />
				</Link>
			</li>
		</ul>
	);
};
export default Pagination;

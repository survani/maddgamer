import {
	BsFacebook,
	BsLinkedin,
	BsPinterest,
	BsReddit,
	BsTwitter,
} from "react-icons/bs";

const SharePost = ({ title, pageUrl }) => {
	return (
		<ul className='list-unstyled social-links social-share mt-4 mt-sm-0 '>
			<li className='d-block mb-2'>Share:</li>
			<li className='d-inline-block'>
				<a
					className='is-hoverable'
					href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<BsTwitter size={16} />
				</a>
			</li>
			<li className='d-inline-block'>
				<a
					className='is-hoverable'
					href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<BsFacebook size={16} />
				</a>
			</li>
			<li className='d-inline-block'>
				<a
					className='is-hoverable'
					href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<BsLinkedin size={16} />
				</a>
			</li>
			<li className='d-inline-block'>
				<a
					className='is-hoverable'
					href={`https://www.reddit.com/submit?url=${pageUrl}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<BsReddit size={16} />
				</a>
			</li>
			<li className='d-inline-block'>
				<a
					className='is-hoverable'
					href={`https://www.pinterest.com/pin/create/button/?&text=${title}&url=${pageUrl}&description=${title}`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<BsPinterest size={16} />
				</a>
			</li>
		</ul>
	);
};
export default SharePost;

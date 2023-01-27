import { Widget } from "@happyreact/react";
import "@happyreact/react/theme.css";
import React from "react";

const Reactions = () => {
	const NEXT_PUBLIC_REACTION = process.env.NEXT_PUBLIC_REACTION;
	return (
		<section className='bg-white shadow-lg rounded-lg p-8 pb-1 mb-8'>
			<h3 className='text-xl mb-5 font-semibold border-b pb-4'>
				What do you think?
			</h3>
			<Widget token={NEXT_PUBLIC_REACTION} resource='users-happiness' />
		</section>
	);
};

export default Reactions;

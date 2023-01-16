import React from "react";

const Footer = () => {
	return (
		<footer class='p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
			<span class='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
				© 2023{" "}
				<a href='https://flowbite.com/' class='hover:underline'>
					MaddGamer
				</a>
				. All rights reserved. No part of this website and its content may be
				reproduced without the permission of the copyright holder.
			</span>
			<ul class='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 list-none'>
				<li>
					<a
						href='https://app.pulsetic.com/status/HSy6N6cm'
						class='mr-4 hover:underline md:mr-6 '
					>
						Status
					</a>
				</li>
				<li>
					<a
						href='https://www.maddgamer.com/privacypolicy'
						class='mr-4 hover:underline md:mr-6'
					>
						Privacy Policy
					</a>
				</li>
				<li>
					<a
						href='https://www.maddgamer.com/cookiepolicy'
						class='mr-4 hover:underline md:mr-6'
					>
						Cookie Policy
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;

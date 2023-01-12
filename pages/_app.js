import { Analytics } from "@vercel/analytics/react";
import React from "react";

import { Layout } from "../components";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
			<Analytics />
		</Layout>
	);
}

export default MyApp;

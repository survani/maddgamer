import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang='en'>
			<Head />

			<body>
				<Main />
				<NextScript />
				<Script
					id='cookieyes'
					type='text/javascript'
					src='https://cdn-cookieyes.com/client_data/5950576c167559a4b405b05e/script.js'
					strategy='beforeInteractive'
				></Script>
			</body>
		</Html>
	);
}

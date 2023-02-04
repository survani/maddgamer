import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
					rel='stylesheet'
				/>
			</Head>

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

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<>
						<meta charset='utf-8'></meta>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1'
						></meta>
						<title>MaddGamer</title>
						<meta name='description' content='Gaming news!'></meta>
						<meta name='author' content='Maddgamer'></meta>
						<meta property='og:title' content='MaddGamer'></meta>
						<meta property='og:type' content='website'></meta>
						<meta property='og:url' content='https://www.maddgamer.com/'></meta>
						<meta
							property='og:description'
							content='A simple HTML5 Template for new projects.'
						></meta>
						<meta property='og:image' content='image.png'></meta>
						<link rel='icon' href='/favicon.ico'></link>
						<link rel='icon' href='/favicon.svg' type='image/svg+xml'></link>
						<link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
						<link rel='stylesheet' href='css/styles.css?v=1.0'></link>
					</>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

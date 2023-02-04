import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AppContext } from "@/components/UseContext";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import "@/styles/style.scss";
import { DM_Sans } from "@next/font/google";
import { useEffect, useState } from "react";

const dm_sans = DM_Sans({
	weight: ["400", "500"],
	display: "swap",
	subsets: ["latin"],
});

export default function TushiApp({ Component, pageProps }) {
	const [searchOpen, setSearchOpen] = useState();

	useEffect(() => {
		import("bootstrap/js/dist/dropdown");
	}, []);

	return (
		<AppContext.Provider value={{ toggleSearch: [searchOpen, setSearchOpen] }}>
			<main className={`${dm_sans.className} d-flex flex-column bg-body`}>
				<Header />

				<section className='mb-auto'>
					<Component {...pageProps} />
				</section>

				<Footer />
			</main>
		</AppContext.Provider>
	);
}

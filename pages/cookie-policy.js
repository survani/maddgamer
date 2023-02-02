import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getSinglePage } from "@/libs/getSinglePage";
import ParseMarkdown from "@/utils/parseMarkdown";

const CookiePolicy = ({ terms }) => {
	const { title, description } = terms.frontMatter;

	return (
		<Layout metaTitle={title} description={description}>
			<PageHeader title={title} />

			<section className='section pt-0'>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-xl-9 col-lg-10'>
							<ParseMarkdown
								tagName='div'
								className='content'
								content={terms.content}
							/>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CookiePolicy;

// Export Props
export const getStaticProps = () => {
	return {
		props: {
			terms: getSinglePage("content/cookie-policy.md"),
		},
	};
};

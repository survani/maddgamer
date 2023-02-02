import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import postConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import path from "path";

const Blog = ({ authors, posts, currentPage, numberOfPages }) => {
  return (
    <Layout metaTitle="Latest Posts">
      <PageHeader title="Latest Posts" truncateBreadcrumb={true} />

      <section className="section pt-0">
        <div className="container">
          <div className="row gy-5 gx-4 g-xl-5">
            {posts.map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <Post post={post} authors={authors} />
              </div>
            ))}

            <div className="col-12 text-center pt-4 mt-5">
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Blog;

export const getStaticPaths = async () => {
  const allPosts = fs.readdirSync(path.join("content/blog"));
  const numberOfPages = Math.ceil(allPosts.length / postConfig.postPerPage);

  let paths = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const allPosts = getPosts();
  const page = parseInt(params && params.page) || 1;
  const numberOfPages = Math.ceil(allPosts.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const orderedPosts = allPosts.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return {
    props: {
      authors: getAuthors(),
      posts: orderedPosts,
      currentPage: page,
      numberOfPages,
    },
  };
};

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Post from "@/components/Post";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { slugify } from "@/utils/slugify";

export default function TagSingle({ authors, posts, category }) {
  let flatPosts = posts.flat();
  function getUniquePostsBy(flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  }
  const uniquePosts = getUniquePostsBy(flatPosts, "slug");

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
      }`}
    >
      <PageHeader title={category} taxonomy={true} />

      <section className="section pt-0">
        <div className="container">
          <div className="row gy-5 gx-md-5">
            {uniquePosts.map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const allPost = getPosts();
  const allCategories = allPost.map(
    (category) => category.frontMatter.categories
  );
  const flatCategories = allCategories.flat();
  const uniqueCategories = [...new Set(flatCategories)];

  const paths = uniqueCategories.map((category) => ({
    params: {
      categoryname: slugify(category),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { categoryname } }) => {
  const allPost = getPosts();
  const filteredPostByCategory = allPost.filter((post) =>
    post.frontMatter.categories
      .map((category) => slugify(category))
      .includes(categoryname)
  );

  return {
    props: {
      authors: getAuthors(),
      posts: filteredPostByCategory,
      category: categoryname,
    },
  };
};

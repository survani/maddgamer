import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Post from "@/components/Post";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { capitalizeText } from "@/utils/capitalizeText";
import { slugify } from "@/utils/slugify";

const TagSingle = ({ authors, posts, tag }) => {
  let flatPosts = posts.flat();
  const getUniquePostsBy = (flatPosts, key) => {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  };
  const uniquePosts = getUniquePostsBy(flatPosts, "slug");

  return (
    <Layout metaTitle={`Showing posts from - ${capitalizeText(tag)}`}>
      <PageHeader title={tag} taxonomy={true} />

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
};

export default TagSingle;

export const getStaticPaths = async () => {
  const allPost = getPosts();
  const allTags = allPost.map((tag) => tag.frontMatter.tags);
  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  const paths = uniqueTags.map((tag) => ({
    params: {
      tagname: slugify(tag),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { tagname } }) => {
  const allPost = getPosts();
  const filteredPostByTag = allPost.filter((post) =>
    post.frontMatter.tags.map((tag) => slugify(tag)).includes(tagname)
  );

  return {
    props: {
      authors: getAuthors(),
      posts: filteredPostByTag,
      tag: tagname,
    },
  };
};

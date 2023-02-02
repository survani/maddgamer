import Author from "@/components/Author";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Post from "@/components/Post";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { ArrowUpRight } from "@/utils/Icons";
import { sortArrayByCount } from "@/utils/sortArrayByCount";
import Link from "next/link";

export default function Authors({ authors, posts }) {
  // All Authors by Post Count
  const allAuthor = posts.map((author) => author.frontMatter.author);
  const sortedAuthor = sortArrayByCount(allAuthor);
  const topAuthors = sortedAuthor.map((x) => {
    const allAuthors = authors.find((y) => {
      if (x.value == y.authorFrontMatter.title) {
        return y.authorFrontMatter.title;
      }
    });
    return allAuthors;
  });

  // Post Count by Author
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle="All Authors">
      <PageHeader title="Authors" />

      <section className="section pt-0">
        <div className="container">
          <div className="row gy-4">
            {topAuthors.map((author, i) => (
              <div key={i} className="col-lg-6">
                <Author author={author} postCount={postCount} posts={posts} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <hr className="bg-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center section-title">
            <div className="col-sm-7">
              <h2 className="h3 mb-0 title">Recent Posts</h2>
            </div>
            <div className="col-sm-5 text-end d-none d-sm-block">
              <Link href="/blog/" className="text-link lead active">
                <span>All Posts</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="row gy-5 gx-md-5">
            {posts.slice(0, 3).map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
          <div className="d-block d-sm-none mt-5 pt-3">
            <div className="text-center">
              <Link href="/blog/" className="text-link lead active">
                <span>All Posts</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      authors: getAuthors(),
      posts: getPosts(),
    },
  };
};

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import Link from "next/link";
import React from "react";

export default function Archive({ posts, archive: { frontMatter } }) {
  // formatDateByYear
  const formatDateByYear = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // formatDateByMonth
  const formatDateByMonth = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // sortByYear
  let postYear = posts.map((year) => formatDateByYear(year.frontMatter.date));
  const uniqueYear = [...new Set(postYear)];

  return (
    <Layout metaTitle={`Post ${frontMatter.title}`}>
      <PageHeader title={frontMatter.title} taxonomy={true} />

      <section className="section pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="archive-block">
                {uniqueYear.map((unqYear) => (
                  <React.Fragment key={unqYear}>
                    <h2 className="h3 mb-3 ms-3">{unqYear}</h2>
                    <ul className="list-unstyled">
                      {posts.map(
                        (post, i) =>
                          formatDateByYear(post.frontMatter.date) ===
                            unqYear && (
                            <li key={i} className="archive-post-item">
                              <Link
                                className="border d-flex align-items-center"
                                href={`/blog/${post.slug}`}
                              >
                                <span className="border d-inline-block bg-white text-center fw-medium text-uppercase opacity-75">
                                  {formatDateByMonth(post.frontMatter.date)}
                                </span>
                                {post.frontMatter.title}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
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
      posts: getPosts(),
      archive: getSinglePage("content/archive.md"),
    },
  };
};

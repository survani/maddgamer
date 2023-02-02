import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getPosts } from "@/libs/getPosts";
import { ArrowRight } from "@/utils/Icons";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import { useState } from "react";

export default function Tags({ posts }) {
  const allTags = posts.map((tag) => tag.frontMatter.tags);
  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  // Count Posts by Tag
  let tagArray = [];
  uniqueTags.map((tag) => {
    flatTags.map((t) => {
      if (tag === t) {
        tagArray.push(tag);
      }
    });
  });
  const postCount = [];
  tagArray.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  // Order Tags
  const [order, setOrder] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("tagOrdered") === "true"
      ? true
      : false
  );
  if (!order) {
    uniqueTags.sort();
  } else {
    uniqueTags.sort((a, b) => postCount[b] - postCount[a]);
  }
  typeof window !== "undefined" && localStorage.setItem("tagOrdered", order);

  return (
    <Layout metaTitle="All Tags">
      <PageHeader title="All Tags" />

      <section className="section pt-0 bg-body">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto">
              <div className="mb-5 lead">
                <span className="me-4 d-inline-flex align-items-center">
                  Order by <ArrowRight className="ms-1" size={20} />
                </span>
                <div
                  className="nav d-flex d-sm-inline-flex"
                  id="filterTaxonomy"
                >
                  <button
                    className={`bg-transparent outline-0 border-0 p-0 me-4 text-dark fw-normal nav-link ${
                      !order ? "active" : ""
                    }`}
                    onClick={() => setOrder(!order)}
                  >
                    Alphabetically
                  </button>
                  <button
                    className={`bg-transparent outline-0 border-0 p-0 text-dark fw-normal nav-link ${
                      order ? "active" : ""
                    }`}
                    onClick={() => setOrder(!order)}
                  >
                    Popularity
                  </button>
                </div>
              </div>

              <div className="row g-2 taxonomy-lists">
                {uniqueTags.map((tag, i) => (
                  <div key={i} className="col-md-4 col-6">
                    <Link
                      href={`/tags/${slugify(tag)}`}
                      className="text-dark px-3 py-2 d-flex lead bg-white"
                    >
                      <div className="flex-grow-1">
                        {tag}
                        <small className="ms-1">({postCount[tag]})</small>
                      </div>
                      <div className="flex-shrink-0 ms-2 icon">
                        <ArrowRight className="opacity-25" size={18} />
                      </div>
                    </Link>
                  </div>
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
    },
  };
};

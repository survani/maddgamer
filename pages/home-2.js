import BlurImage from "@/components/BlurImage";
import BootstrapIcon from "@/components/BootstrapIcon";
import Layout from "@/components/Layout";
import siteConfig from "@/config/site.config.json";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { formatDate } from "@/utils/formatDate";
import { Calender, ChevronLeft, ChevronRight, Clock } from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import { useState } from "react";

const HomeTwo = ({ homepage, posts }) => {
  const { subtitle, title, image, socialLinks } = homepage.frontMatter;
  const { content } = homepage;

  // Post per Page
  const postPerPage = siteConfig.homeTwoPostPerPage;
  const totalPage = Math.ceil(posts.length / postPerPage);

  // Pagination
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollIntoPost = () => {
    document
      .getElementById("recent-posts")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - postPerPage);
      setCurrentPage(currentPage - 1);
      scrollIntoPost();
    }
  };
  const handleNext = () => {
    if (currentIndex + postPerPage < posts.length) {
      setCurrentIndex(currentIndex + postPerPage);
      setCurrentPage(currentPage + 1);
      scrollIntoPost();
    }
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10 text-center">
              <div className="mb-5">
                <BlurImage
                  className="img-fluid"
                  src={image}
                  alt={title}
                  width={180}
                  height={180}
                />
              </div>

              <p className="mb-2">{subtitle}</p>
              <h1 className="h2 text-dark mb-4">{title}</h1>

              <ParseMarkdown
                tagName="div"
                className="content"
                content={content}
              />

              <ul className="list-inline social-links mt-4">
                {socialLinks.map((data, key) => (
                  <li
                    key={key}
                    className="list-inline-item me-4 mt-1 text-center"
                  >
                    <a
                      className="lh-1 d-flex align-items-center"
                      href={data.link}
                      title={data.name}
                    >
                      <BootstrapIcon icon={data.icon} size={14} />
                      <span className="text-link ms-2">{data.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="section">
                <div className="border-top"></div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-end section-title">
            <div
              className={
                currentPage > 1
                  ? "col-xl-6 col-lg-7 col-9"
                  : "col-xl-9 col-lg-10"
              }
            >
              <h2 className="h3 mb-0 title">Recent Posts</h2>
            </div>
            {currentPage > 1 && (
              <div className="col-lg-3 col-3 text-end">
                <small>Page {currentPage}</small>
              </div>
            )}
          </div>
          <div
            id="recent-posts"
            className="row justify-content-center gy-5 gx-md-5"
            style={{ scrollMarginTop: "170px" }}
          >
            {posts
              .slice(currentIndex, currentIndex + postPerPage)
              .map((post, i) => (
                <div key={i} className="col-xl-9 col-lg-10">
                  <article className="bg-white d-flex flex-column">
                    <div className="p-4">
                      <ul className="taxonomy-lists taxonomy-lists-active list-unstyled list-inline mb-3">
                        {post.frontMatter.tags.map((tag, i) => (
                          <li key={i} className="list-inline-item me-1">
                            <Link
                              href={`/tags/${slugify(tag)}`}
                              className="bg-white"
                            >
                              <span className="small me-1">#</span>
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="position-relative">
                        <h3 className="h4 post-title mb-2 line-clamp clamp-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-link stretched-link"
                          >
                            {post.frontMatter.title}
                          </Link>
                        </h3>
                        <p className="mb-0 line-clamp clamp-2">
                          {post.frontMatter.description}
                        </p>
                      </div>
                      <ul className="post-meta list-inline mt-3">
                        <li className="list-inline-item">
                          <Calender className="me-1 align-bottom" />
                          {formatDate(post.frontMatter.date)}
                        </li>
                        <li className="list-inline-item">•</li>
                        <li className="list-inline-item">
                          <Clock className="me-1 align-bottom" />
                          {readingTime(post.content)} min read
                        </li>
                      </ul>
                    </div>
                  </article>
                </div>
              ))}

            <div className="col-xl-9 col-lg-10 text-center pt-5 mt-5">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${
                    posts.length === 0 || currentIndex === 0 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link page-link-previous bg-transparent rounded-0 px-0 border-0 text-dark text-link text-uppercase fw-medium"
                    aria-label="Pagination Arrow"
                    onClick={handlePrev}
                  >
                    <ChevronLeft /> <span>Previous</span>
                  </button>
                </li>
                <li
                  className="page-item page-count"
                  title={`Page ${currentPage} of ${totalPage}`}
                >
                  <span className="current-page">{currentPage}</span>
                  <span className="total-page">{totalPage}</span>
                </li>
                <li
                  className={`page-item ${
                    posts.length === 0 ||
                    currentIndex + postPerPage >= posts.length
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link bg-transparent rounded-0 px-0 border-0 text-dark text-link active text-uppercase fw-medium"
                    aria-label="Pagination Arrow"
                    onClick={handleNext}
                  >
                    <span>Next</span> <ChevronRight />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default HomeTwo;

// Export Props
export const getStaticProps = () => {
  return {
    props: {
      homepage: getSinglePage("content/_index-2.md"),
      posts: getPosts(),
    },
  };
};

import BlurImage from "@/components/BlurImage";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { ArrowUpRight, EditCircle } from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { sortArrayByCount } from "@/utils/sortArrayByCount";
import Link from "next/link";

const About = ({ posts, about, authors }) => {
  const { title, image, description, intro, ourStory, ourAuthors } =
    about.frontMatter;

  // Top Authors
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
    <Layout metaTitle={title} description={description} ogImage={image}>
      <PageHeader title={title} />

      {/* Intro */}
      <section className="section pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <BlurImage
                className="img-fluid h-auto mb-5"
                src={image}
                alt={title}
                width={876}
                height={398}
              />
              <ParseMarkdown
                tagName="div"
                className="content"
                content={intro}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="section-title">
                <h2 className="h3 mb-0 title">{ourStory.title}</h2>
              </div>
              <div className="row gx-lg-5 gy-4">
                <div className="col-md-6">
                  <ParseMarkdown
                    tagName="div"
                    className="content"
                    content={ourStory.leftContent}
                  />
                </div>
                <div className="col-md-6">
                  <ParseMarkdown
                    tagName="div"
                    className="content"
                    content={ourStory.rightContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Authors */}
      <div className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="row align-items-center section-title">
                <div className="col-sm-7">
                  <ParseMarkdown
                    tagName="h2"
                    className="h3 mb-0 title"
                    content={ourAuthors.title}
                  />
                </div>
                <div className="col-sm-5 text-end d-none d-sm-block">
                  <Link href="/author/" className="text-link lead active">
                    <ParseMarkdown content={ourAuthors.linkLabel} />
                    <ArrowUpRight />
                  </Link>
                </div>
              </div>
              <div className="row gy-5 gx-md-5">
                {topAuthors.map((author, i) => (
                  <div className="col-md-6" key={i}>
                    <Link
                      href={`/author/${author.authorSlug}`}
                      className="bg-white text-dark p-3 d-flex is-hoverable"
                      title={author.authorFrontMatter.title}
                    >
                      <div className="flex-shrink-0 me-3">
                        <BlurImage
                          className="shadow img-fluid"
                          src={author.authorFrontMatter.image}
                          alt={author.authorFrontMatter.title}
                          width="90"
                          height="90"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex flex-column h-100">
                          <div>
                            <h3 className="h4 text-dark mb-1 line-clamp clamp-1">
                              {author.authorFrontMatter.title}
                            </h3>
                            <p className="mb-2 lh-1 line-clamp clamp-1">
                              {author.authorFrontMatter.subtitle}
                            </p>
                          </div>
                          <p className="fw-medium mt-auto mb-0 small">
                            <EditCircle className="me-2" />
                            <span className="text-black">
                              {postCount[author.authorFrontMatter.title] < 9
                                ? "0" +
                                  postCount[author.authorFrontMatter.title]
                                : postCount[author.authorFrontMatter.title]}
                            </span>{" "}
                            Published posts
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="d-block d-sm-none mt-5 pt-3">
                <div className="text-center">
                  <Link href="/author/" className="text-link lead active">
                    <ParseMarkdown content={ourAuthors.linkLabel} />
                    <ArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default About;

// Export Props
export const getStaticProps = () => {
  return {
    props: {
      about: getSinglePage("content/about.md"),
      authors: getAuthors(),
      posts: getPosts(),
    },
  };
};

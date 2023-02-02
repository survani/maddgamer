import BlurImage from "@/components/BlurImage";
import BootstrapIcon from "@/components/BootstrapIcon";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { EditCircle } from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { slugify } from "@/utils/slugify";

export default function AuthorSingle({
  author: { authorContent, authorFrontMatter },
  posts,
}) {
  const { title, subtitle, image, socialLinks } = authorFrontMatter;
  const postCount = posts.length;

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
              <h1 className="h2 text-dark mb-1">{title}</h1>
              <p>{subtitle}</p>
              <p className="mb-3">
                <EditCircle />
                <span className="fw-medium text-black ms-1">
                  {postCount < 9 ? `0${postCount}` : postCount}
                </span>{" "}
                Published posts
              </p>
              <ParseMarkdown
                tagName="div"
                className="content"
                content={authorContent}
              />
              <ul className="list-inline social-links mt-4">
                {socialLinks.map((data, key) => (
                  <li
                    key={key}
                    className="list-inline-item me-3 mt-1 text-center"
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
          <div className="row align-items-center section-title">
            <div className="col-12">
              <div className="section-title mb-3 text-center">
                <p className="mb-2">Posts of</p>
                <h2 className="h3 mb-0 title">{title}</h2>
              </div>
            </div>
          </div>
          <div className="row gy-5 gx-md-5 justify-content-center">
            {posts.map((post, key) => (
              <div key={key} className="col-lg-4 col-md-6">
                <Post post={post} authors="current" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const allAuthors = getAuthors();
  const paths = allAuthors.map((author) => ({
    params: {
      author_name: author.authorSlug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { author_name } }) => {
  const allPosts = getPosts();
  const postByCurrentAuthor = allPosts.filter(
    (post) => slugify(post.frontMatter.author) == author_name
  );

  const allAuthors = getAuthors();
  const currentAuthor = allAuthors.filter(
    (author) => author.authorSlug == author_name
  );

  return {
    props: {
      posts: postByCurrentAuthor,
      authors: allAuthors,
      author: currentAuthor[0],
    },
  };
};

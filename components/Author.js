import { formatDate } from "@/utils/formatDate";
import { ArrowRight, ArrowUpRight, Calender, Clock } from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { readingTime } from "@/utils/readingTime";
import { slugify } from "@/utils/slugify";
import { truncateString } from "@/utils/truncateString";
import Link from "next/link";
import BlurImage from "./BlurImage";

const Author = ({
  author: { authorSlug, authorContent, authorFrontMatter },
  postCount,
  posts,
}) => {
  const { title, subtitle, image } = authorFrontMatter;

  // Posts Count
  const totalPosts = postCount[title];
  const postsleftToRead =
    totalPosts - 2 < 9 ? `0${totalPosts - 2}` : totalPosts - 2;

  // Filtered Post by Author
  const filteredPostByAuthor = posts.filter((post) =>
    slugify(post.frontMatter.author).includes(authorSlug)
  );

  return (
    <div className="bg-white p-4 h-100">
      <div className="d-sm-flex">
        <div className="flex-shrink-0">
          <BlurImage
            className="img-fluid me-4"
            src={image}
            alt={title}
            width={118}
            height={118}
          />
        </div>
        <div className="flex-grow-1 mt-3 mt-sm-0">
          <h4 className="text-dark mb-1">{title}</h4>
          <p className="mb-2 small">{subtitle}</p>
          <ParseMarkdown
            content={truncateString(authorContent, 85)}
            className="me-2"
          />
          <Link
            href={`/author/${authorSlug}`}
            className="d-inline-block text-link active"
          >
            Read More <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="opacity-50">
        <hr className="text-dark mt-4 mb-3" />
      </div>
      <div className="section-title mb-0">
        <p className="lead fw-medium title mb-3">Recent Posts</p>
      </div>
      <div className="row gy-4 gx-md-5 align-items-center">
        {filteredPostByAuthor.slice(0, 2).map((post, key) => (
          <div key={key} className="col-md-6">
            <article className="h-100 position-relative">
              <h3 className="h5 mb-2 line-clamp clamp-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-link stretched-link"
                  title={post.frontMatter.title}
                >
                  {post.frontMatter.title}
                </Link>
              </h3>
              <ul className="list-inline small">
                <li className="list-inline-item">
                  <span
                    className="d-inline-block"
                    style={{ transform: "translateY(-1px)" }}
                  >
                    <Calender size={16} className="me-1" />
                  </span>
                  {formatDate(post.frontMatter.date)}
                </li>
                <li className="list-inline-item">•</li>
                <li className="list-inline-item">
                  <span
                    className="d-inline-block"
                    style={{ transform: "translateY(-1px)" }}
                  >
                    <Clock size={16} className="me-1" />
                  </span>
                  {readingTime(post.content)} min
                </li>
              </ul>
            </article>
          </div>
        ))}
        <div className="col-12">
          {postsleftToRead != 0 ? (
            <>
              {title.split(" ")[0]} has{" "}
              <Link
                href={`/author/${authorSlug}`}
                className="text-link lead active"
                style={{ fontSize: "0.875em" }}
              >
                <span className="fw-medium">{postsleftToRead}</span> more
                {postsleftToRead > 0 ? " Post" : " Posts"}
                <ArrowUpRight size={14} />
              </Link>{" "}
              to Read
            </>
          ) : (
            <small>
              {title.split(" ")[0]} have only{" "}
              <span className="fw-medium text-dark">0{totalPosts}</span> Posts!
            </small>
          )}
        </div>
      </div>
    </div>
  );
};
export default Author;

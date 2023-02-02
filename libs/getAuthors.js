import fs from "fs";
import matter from "gray-matter";
import path from "path";

const authorDirectory = "content/author";
const authorDirFiles = fs.readdirSync(path.join(authorDirectory));
const authors = authorDirFiles.filter((f) => f.includes(".md"));

export const getAuthors = () => {
  const returnDirFiles = authors.map((filename) => {
    const authorSlug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join(authorDirectory, filename),
      "utf-8"
    );
    const { data: authorFrontMatter, content } = matter(dirFileContents);

    return {
      authorSlug,
      authorFrontMatter,
      authorContent: content,
    };
  });
  return returnDirFiles;
};

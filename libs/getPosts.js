import { sortByDate } from "@/utils/sortByDate";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const blogDirectory = "content/blog";
const blogDirFiles = fs.readdirSync(path.join(blogDirectory));
const blogs = blogDirFiles.filter((f) => f.includes(".md"));

export const getPosts = () => {
	const returnDirFiles = blogs.map((filename) => {
		const slug = filename.replace(".mdx", "");
		const dirFileContents = fs.readFileSync(
			path.join(blogDirectory, filename),
			"utf8"
		);

		const { data: frontMatter, content } = matter(dirFileContents);

		return {
			slug,
			frontMatter,
			content,
		};
	});
	return returnDirFiles.sort(sortByDate);
};

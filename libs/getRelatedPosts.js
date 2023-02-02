export const getRelatedPosts = (allPosts, slug, tags, categories) => {
  // Filter with Categories
  const filterByCategories = allPosts.filter((item) =>
    categories.find((category) =>
      item.frontMatter.categories.includes(category)
    )
  );
  // Filter with Tags
  const filterByTags = allPosts.filter((item) =>
    tags.find((tag) => item.frontMatter.tags.includes(tag))
  );

  // Merge posts, Get first 3 related posts and remove Current post
  const mergePosts = [...new Set([...filterByCategories, ...filterByTags])];
  const relatedPosts = mergePosts
    .filter((post) => post.slug !== slug)
    .slice(0, 3);

  return relatedPosts;
};

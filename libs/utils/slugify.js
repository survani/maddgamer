export const slugify = (string) => {
  return string.trim().replace(/ /g, "-").toLowerCase();
};

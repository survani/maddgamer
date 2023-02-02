import { marked } from "marked";

const ParseMarkdown = ({ tagName, className, content }) => {
  if (!content) return null;

  const TagName = tagName;
  return TagName ? (
    <TagName
      className={className}
      dangerouslySetInnerHTML={{
        __html:
          tagName === "div"
            ? marked.parse(content)
            : marked.parseInline(content),
      }}
    />
  ) : (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: marked.parseInline(content),
      }}
    />
  );
};
export default ParseMarkdown;

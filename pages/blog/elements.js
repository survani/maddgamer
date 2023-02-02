import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getSinglePage } from "@/libs/getSinglePage";
import { useScript } from "@/libs/useScript";

// Marked & Highlight JS
import hljs from "highlight.js";
import "highlight.js/scss/base16/dracula.scss";
import { marked } from "marked";

const Elements = ({ elements: { frontMatter, content } }) => {
  const { title, description } = frontMatter;

  // Marked Options
  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <Layout metaTitle={title} description={description}>
      <PageHeader title={title} />

      <section className="section pt-0 bg-body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(content),
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {useScript("/js/lightense.min.js", "body", true)}
    </Layout>
  );
};

export default Elements;

export const getStaticProps = () => {
  return {
    props: {
      elements: getSinglePage("content/elements.md"),
    },
  };
};

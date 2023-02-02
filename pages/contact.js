import Layout from "@/components/Layout";
import { getSinglePage } from "@/libs/getSinglePage";
import { Email, Loader, Phone, Send } from "@/utils/Icons";
import ParseMarkdown from "@/utils/parseMarkdown";
import { useState } from "react";

const Contact = ({ contactPage }) => {
  const { title, image, description, contact } = contactPage.frontMatter;
  const { email, mailSubject, successMessage, errorMessage } =
    contact.contactForm;

  // Handler Form Submit
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const formsubmitURL = `https://formsubmit.co/ajax/${email}`;

  const formHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(formsubmitURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _subject: mailSubject,
        email: email_address.value,
        name: full_name.value,
        message: message.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSubmitted("success");
        e.target.reset();
      })
      .catch((error) => {
        setLoading(false);
        setSubmitted("error");
      });
  };

  return (
    <Layout metaTitle={title} description={description} ogImage={image}>
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              <div className="section-title">
                <h1 className="h3 mb-0 title">{title}</h1>
              </div>
              <div className="row gy-5 gx-lg-5">
                <div className="col-lg-6 order-1 order-lg-0">
                  <form
                    className="row gy-4"
                    method="POST"
                    onSubmit={formHandler}
                  >
                    <div className="col-md-12">
                      <input
                        type="hidden"
                        name="_subject"
                        value={mailSubject}
                      />
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        id="email_address"
                        name="email_address"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name here"
                        id="full_name"
                        name="full_name"
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        placeholder="Ask question or just say Hi"
                        rows="4"
                        id="message"
                        name="message"
                        required
                      ></textarea>
                    </div>
                    {submitted == "success" && (
                      <div className="col-12">
                        <ParseMarkdown
                          tagName="p"
                          className="mb-0 form-success"
                          content={successMessage}
                        />
                      </div>
                    )}
                    {submitted == "error" && (
                      <div className="col-12">
                        <ParseMarkdown
                          tagName="p"
                          className="mb-0 form-error"
                          content={errorMessage}
                        />
                      </div>
                    )}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-light bg-white"
                        aria-label="Send Message"
                      >
                        {!loading ? (
                          <>
                            Send <Send className="ms-2" />
                          </>
                        ) : (
                          <>
                            Sending <Loader className="ms-2" size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 order-0 order-lg-1">
                  <div className="ps-0 ps-lg-4">
                    <div className="mb-4 mb-lg-5">
                      <p className="h4 mb-3">{contact.title}</p>
                      <ParseMarkdown tagName="p" content={contact.content} />
                    </div>
                    <p className="mb-3">
                      {/* prettier-ignore */}
                      <Email className="d-inline-block me-3 text-dark" />
                      <a className="text-link" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </p>
                    <p className="mb-0">
                      <Phone className="d-inline-block me-3 text-dark" />
                      <a
                        className="text-link active"
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      >
                        {contact.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

// Export Props
export const getStaticProps = () => {
  return {
    props: {
      contactPage: getSinglePage("content/contact.md"),
    },
  };
};

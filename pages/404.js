import Layout from "@/components/Layout";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <Layout metaTitle={"Page Not Found"}>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-10 mx-auto text-center">
              <h1 className="page-not-found-title">
                4<span className="bg-dark text-white px-2 lh-0">0</span>4
              </h1>
              <p className="mb-4">
                Oops. The page you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link href="/" className="btn btn-dark">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

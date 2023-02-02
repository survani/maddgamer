import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/BreadcrumbItem";
import { capitalizeText } from "@/utils/capitalizeText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PageHeader = ({ title, truncateBreadcrumb, taxonomy }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <section className="section">
      <div className="container">
        <div className="row gy-3 align-items-center section-title mb-0">
          <div className="col-sm-6">
            {taxonomy && <p>Showing posts from</p>}
            <h1 className="h3 mb-0 title">{capitalizeText(title)}</h1>
          </div>
          <div className="col-sm-6 text-sm-end">
            <Breadcrumb truncateBreadcrumb={truncateBreadcrumb}>
              <li className="list-inline-item">
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" 
                style={{transform: "translateY(-2px) rotateY(180deg)"}}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2"></path>
                  <path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5"></path>
                  <path d="M16 19h6"></path>
                  <path d="M19 16l3 3l-3 3"></path>
                </svg>
              </li>
              <BreadcrumbItem isCurrent={router.pathname === "/"} href="/">
                Home
              </BreadcrumbItem>
              {breadcrumbs &&
                breadcrumbs.map((breadcrumb) => (
                  <React.Fragment key={breadcrumb.href}>
                    <li className="list-inline-item">
                      <span className="px-1">•</span>
                    </li>
                    <BreadcrumbItem
                      href={breadcrumb.href}
                      isCurrent={breadcrumb.isCurrent}
                    >
                      {breadcrumb.label}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
            </Breadcrumb>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PageHeader;

import { Children, Fragment } from "react";

const Breadcrumb = ({ children, truncateBreadcrumb }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return <Fragment key={index}>{child}</Fragment>;
    }
    return child;
  });

  return (
    <nav aria-label="breadcrumb">
      <ul
        className={`list-inline breadcrumb-menu ${
          truncateBreadcrumb && "breadcrumb-menu-truncate"
        }`}
      >
        {childrenWtihSeperator}
      </ul>
    </nav>
  );
};

export default Breadcrumb;

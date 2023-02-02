import { capitalizeText } from "@/utils/capitalizeText";
import Link from "next/link";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li className="list-inline-item" {...props}>
      <Link className="text-link" href={href} passHref>
        {capitalizeText(children)}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;

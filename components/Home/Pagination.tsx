/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable-next-line react/no-array-index-key */

import Link from "next/link";
import { IMainPageProps } from "@/app/page";
import { generateURL } from "@/utils/url";

interface IProps {
  totalPages: number;
  searchParams: IMainPageProps["searchParams"];
  currentURL: string;
}

function Pagination({ totalPages, searchParams, currentURL }: IProps) {
  return (
    <nav>
      <ul className="pagination">
        {Array(totalPages)
          .fill(0)
          .map((_, idx) => (
            <li
              key={idx}
              className={`page-item ng-scope ${
                Number(searchParams.page || 1) === idx + 1 ? "active" : ""
              }`}
            >
              <Link
                className="page-link ng-binding"
                href={generateURL(currentURL, { ...searchParams, page: String(idx + 1) })}
              >
                {idx + 1}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Pagination;

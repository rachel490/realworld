import { PAGINATION } from "@/constants/pagination";

interface IMainSearchParams {
  limit: number;
  page: number;
  feed: "my" | "tag";
  tagName: string;
}

// TODO: 추후 고도화
class Pagination {
  static calculateTotalPage = (searchParams: IMainSearchParams) => {};

  static calculatePageSetNumber(currentPage: number) {
    return Math.ceil(currentPage / PAGINATION.PAGE_LIMIT);
  }

  static generatePageSet(pageSetNumber: number) {
    const endPage = pageSetNumber * PAGINATION.PAGE_LIMIT;
    const startPage = endPage - PAGINATION.PAGE_LIMIT + 1;

    return {
      endPage,
      startPage,
    };
  }

  static firstPageButtonLink(searchParams: IMainSearchParams) {
    const pageSetNumber = this.calculatePageSetNumber(Number(PAGINATION.PAGE));
    const { startPage, endPage } = this.generatePageSet(pageSetNumber);

    return { searchParams: { ...searchParams, page: PAGINATION.PAGE }, startPage, endPage };
  }

  static lastPageButtonLink(searchParams: IMainSearchParams) {
    const pageSetNumber = this.calculatePageSetNumber(Number(PAGINATION.PAGE));
    const { startPage, endPage } = this.generatePageSet(pageSetNumber);

    return { searchParams: { ...searchParams, page: PAGINATION.PAGE }, startPage, endPage };
  }

  static previousButtonLink(searchParams: IMainSearchParams) {
    const pageSetNumber = this.calculatePageSetNumber(Number(searchParams.page));
    const { startPage, endPage } = this.generatePageSet(pageSetNumber - 1);
    return {};
  }

  // nextButtonLink(searchParams) {
  //   return {};
  // }

  // pageButtonLink() {}
}

const pagination = new Pagination();
export default pagination;

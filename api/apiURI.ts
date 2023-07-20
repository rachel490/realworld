import { generateQueryString } from "@/utils/url";

export const URI_PATH = {
  ARTICLE: `/articles`,
  USERS: "/users",
  USER: "/user",
  TAG: "/tags",
  PROFILE: "/profiles",
};

export const API_URI = {
  article: {
    get: {
      GLOBAL_FEED: (tag?: string, page = 1, limit = 10) => {
        const offset = limit * (page - 1);
        const queryString = generateQueryString({ tag, offset, limit });
        return `${URI_PATH.ARTICLE}${queryString ? `?${queryString}` : ""}`;
      },
      MY_FEED: (page = 1, limit = 10) => {
        const offset = limit * (page - 1);
        const queryString = generateQueryString({ offset, limit });
        return `${URI_PATH.ARTICLE}/feed${queryString ? `?${queryString}` : ""}`;
      },
      ARTICLE_DETAIL: (slug: string) => `${URI_PATH.ARTICLE}/${slug}`,
      ARTICLE_COMMENT: (slug: string) => `${URI_PATH.ARTICLE}/${slug}/comments`,
      USER_POSTED_ARTICLES: (username: string) => {
        const queryString = generateQueryString({ author: username });
        return `${URI_PATH.ARTICLE}${queryString ? `?${queryString}` : ""}`;
      },
      USER_FAVORITED_ARTICLES: (username: string) => {
        const queryString = generateQueryString({ favorited: username });
        return `${URI_PATH.ARTICLE}${queryString ? `?${queryString}` : ""}`;
      },
    },
    post: {
      ARTICLE: `${URI_PATH.ARTICLE}`,
      ARTICLE_LIKE: (slug: string) => `${URI_PATH.ARTICLE}/${slug}/favorite`,
      ARTICLE_COMMENT: (slug: string) => `${URI_PATH.ARTICLE}/${slug}/comments`,
    },
    update: {
      ARTICLE: (slug: string) => `${URI_PATH.ARTICLE}/${slug}`,
    },
    delete: {
      ARTICLE: (slug: string) => `${URI_PATH.ARTICLE}/${slug}`,
      ARTICLE_LIKE: (slug: string) => `${URI_PATH.ARTICLE}/${slug}/favorite`,
      ARTICLE_COMMENT: (slug: string) => `${URI_PATH.ARTICLE}/${slug}/comments`,
    },
  },
  tag: {
    get: {
      TRENDING_TAG: `${URI_PATH.TAG}`,
    },
  },
  profile: {
    get: {
      USER_PROFILE: (username: string) => `${URI_PATH.PROFILE}/${username}`,
    },
    post: {
      FOLLOW_USER: (username: string) => `${URI_PATH.PROFILE}/${username}/follow`,
    },
    delete: {
      UNFOLLOW_USER: (username: string) => `${URI_PATH.PROFILE}/${username}/follow`,
    },
  },
  auth: {
    get: {
      USER: `${URI_PATH.USER}`,
    },
    post: {
      LOGIN: `${URI_PATH.USERS}/login`,
      SIGN_UP: `${URI_PATH.USERS}`,
    },
    update: {
      USER: `${URI_PATH.USER}`,
    },
  },
};

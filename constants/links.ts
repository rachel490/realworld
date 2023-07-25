export const PAGE_LINKS = {
  home: "/",
  register: "/register",
  login: "/login",
  article: (slug: string) => `/article/${slug}`,
  profilePosts: (username: string, isEncoded = false) => {
    return `/profile/${isEncoded ? username : encodeURIComponent(username)}`;
  },
  profileFavorites: (encodedUsername: string) => `/profile/${encodedUsername}/favorites`,
  newPost: "/editor",
  editPost: (slug: string) => `/editor/${slug}`,
  settings: "/settings",
};

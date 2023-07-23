export const PAGE_LINKS = {
  home: "/",
  register: "/register",
  login: "/login",
  article: (slug: string) => `/article/${slug}`,
  profilePosts: (username: string) => `/profile/${encodeURIComponent(username)}`,
  profileFavorites: (username: string) => `/profile/${encodeURIComponent(username)}/favorites`,
  newPost: "/editor",
  editPost: (slug: string) => `/editor/${slug}`,
  settings: "/settings",
};

export interface IAuthor {
  username: string;
  bio: null | string;
  image: string;
  following: boolean;
}

export interface IProfileResponse {
  profile: IAuthor;
}

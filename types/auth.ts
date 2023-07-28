export interface IUser {
  email: string;
  username: string;
  bio: null | string;
  image: string;
  token: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface IRegisterBody {
  user: {
    username: string;
    email: string;
    password: string;
    [key: string]: string;
  };
}

export interface ILoginBody {
  user: {
    email: string;
    password: string;
    [key: string]: string;
  };
}

export interface IUserSettingsBody {
  user: {
    email: string;
    username: string;
    password: string;
    bio: string | null;
    image: string;
    [key: string]: string | null;
  };
}

export interface ICustomError {
  errors: {
    [key: string]: string[];
  };
}

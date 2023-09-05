export type UserType = {
  _id?: string;
  id?: string;
  username?: string;
  name?: string;
  bio?: string;
  image?: string;
  imageUrl?: string;
  onboarded?: boolean;
  threads?: string[];
  communities?: string[];
};

export type UpdateUserType = Required<
  Pick<UserType, 'username' | 'name' | 'bio' | 'image'>
> & {
  userId: string;
  path: string;
};

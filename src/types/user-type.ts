import { ThreadType } from '@/types/thread-type';
import { CommunityType } from '@/types/community-type';

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

export type UserThreadsType = {
  name: string;
  image: string;
  id: string;
  threads: [
    Required<Pick<ThreadType, '_id' | 'text' | 'createdAt'>> & {
      parentId: string | null;
      author: Required<Pick<UserType, 'id' | 'name' | 'image'>>;
      community: Required<Pick<CommunityType, 'id' | 'name' | 'image'>> | null;
      children: [
        {
          author: {
            image: string;
          };
        },
      ];
    },
  ];
};

export type UpdateUserType = Required<
  Pick<UserType, 'username' | 'name' | 'bio' | 'image'>
> & {
  userId: string;
  path: string;
};

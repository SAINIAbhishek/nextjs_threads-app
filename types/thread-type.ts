export type ThreadType = {
  _id?: string;
  text: string;
  author: string;
  community: string;
  parentId: string;
  createdAt: string;
  children: string[];
};

export type UpdateThreadType = Pick<ThreadType, 'text' | 'author'> & {
  communityId: string | null;
  path: string;
};

export type ThreadCommentType = {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
};

export type DeleteThreadType = {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
};

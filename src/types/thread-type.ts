export type ThreadType = {
  text: string;
  author: string;
  community: string;
  parentId: string;
  createdBy: string;
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

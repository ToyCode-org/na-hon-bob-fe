export type CreateCommunity = {
  title: string;
  content: string;
};

export type UpdateCommunity = CreateCommunity;

export type CreateCommunityComment = {
  content: string;
};
export type UpdateCommunityComment = CreateCommunityComment;

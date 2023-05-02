export type CreateCommunity = {
  title: string;
  content: string;
};

export type UpdateCommunity = CreateCommunity;

export type CreateCommunityComment = {
  content: string;
};
export type UpdateCommunityComment = CreateCommunityComment;

export type CommunityList = {
  community_id: number;
  community_comment_id: number;
  user_id: number;
  user: { nickname: string; avatar: string };
  content: string;
  createdAt: string;
  isEditable: boolean;
  isLiked: boolean;
  likes_count: number;
};

export type postFormData = {
  thumbnail: string;
  title: string;
  ingredient: string;
  description: string;
};

export type UpdateDispatch = {
  post_id: number;
  formData: postFormData;
};

export type CommentsData = {
  comment_id: number;
  content: string;
  createdAt: string;
  isEditable: boolean;
  modifiedAt: string;
  post_id: number;
  user: { nickname: string; avatar: string };
  user_id: number;
};

export type GetCommentDispatch = {
  post_id: number;
  page: number;
};

export type AddCommentDispatch = {
  post_id: number;
  content: string;
  page: number;
  nickname: string;
  avatar: string;
};

export type EditCommentDispatch = {
  comment_id: number;
  content: string;
};

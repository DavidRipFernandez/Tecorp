export interface Comment {
  id: number;
  postId: number;
  username: string;
  email: string;
  content: string;
  createdAt: string;
  contentPreview: string;
}

export interface CreateCommentDto {
  username: string;
  email: string;
  content: string;
}

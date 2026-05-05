export interface Post {
  id: number;
  username: string;
  email: string;
  content: string;
  createdAt: string;
  contentPreview: string;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: ApiMeta;
}

export interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

export interface CreatePostDto {
  username: string;
  email: string;
  content: string;
}

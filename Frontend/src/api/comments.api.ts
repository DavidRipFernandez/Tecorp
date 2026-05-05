import apiClient from './client';
import type { Comment, CreateCommentDto } from '../types/comment.types';
import type { ApiListResponse, ApiSingleResponse } from '../types/post.types';

export const getComments = async (postId: number): Promise<ApiListResponse<Comment>> => {
  const response = await apiClient.get<ApiListResponse<Comment>>(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (
  postId: number,
  dto: CreateCommentDto,
): Promise<ApiSingleResponse<Comment>> => {
  const response = await apiClient.post<ApiSingleResponse<Comment>>(
    `/posts/${postId}/comments`,
    dto,
  );
  return response.data;
};

import apiClient from './client';
import type { Post, CreatePostDto, ApiListResponse, ApiSingleResponse } from '../types/post.types';

export const getPosts = async (page = 1, limit = 10): Promise<ApiListResponse<Post>> => {
  const response = await apiClient.get<ApiListResponse<Post>>('/posts', {
    params: { page, limit },
  });
  return response.data;
};

export const getPostById = async (id: number): Promise<ApiSingleResponse<Post>> => {
  const response = await apiClient.get<ApiSingleResponse<Post>>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (dto: CreatePostDto): Promise<ApiSingleResponse<Post>> => {
  const response = await apiClient.post<ApiSingleResponse<Post>>('/posts', dto);
  return response.data;
};

import { useState, useEffect } from 'react';
import { getPosts, createPost } from '../api/posts.api';
import type { Post, CreatePostDto } from '../types/post.types';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (dto: CreatePostDto) => Promise<void>;
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPosts();
        if (res.success) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setPosts(sorted);
        }
      } catch {
        setError('Error al cargar los posts. Verifica que el servidor esté funcionando.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Errors propagate to the caller (form) for display
  const addPost = async (dto: CreatePostDto): Promise<void> => {
    const res = await createPost(dto);
    if (res.success) {
      setPosts(prev => [res.data, ...prev]);
    }
  };

  return { posts, loading, error, addPost };
};

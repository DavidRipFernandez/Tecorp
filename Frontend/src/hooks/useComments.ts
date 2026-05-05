import { useState, useEffect } from 'react';
import { getComments, createComment } from '../api/comments.api';
import type { Comment, CreateCommentDto } from '../types/comment.types';

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (dto: CreateCommentDto) => Promise<void>;
}

export const useComments = (postId: number): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getComments(postId);
        if (res.success) {
          setComments(res.data);
        }
      } catch {
        setError('Error al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  // Errors propagate to the caller (form) for display
  const addComment = async (dto: CreateCommentDto): Promise<void> => {
    const res = await createComment(postId, dto);
    if (res.success) {
      setComments(prev => [...prev, res.data]);
    }
  };

  return { comments, loading, error, addComment };
};

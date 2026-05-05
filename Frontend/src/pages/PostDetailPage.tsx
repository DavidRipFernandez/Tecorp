import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../api/posts.api';
import { useComments } from '../hooks/useComments';
import { CommentForm } from '../components/comments/CommentForm';
import { CommentList } from '../components/comments/CommentList';
import type { Post } from '../types/post.types';
import postStyles from '../components/posts/posts.module.css';
import commentStyles from '../components/comments/comments.module.css';

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? '0', 10);

  const [post, setPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

  const { comments, loading: commentsLoading, error: commentsError, addComment } = useComments(postId);

  useEffect(() => {
    if (!postId) {
      setPostError('ID de post inválido.');
      setPostLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        setPostLoading(true);
        setPostError(null);
        const res = await getPostById(postId);
        if (res.success) {
          setPost(res.data);
        }
      } catch {
        setPostError('No se pudo cargar el post. Verifica que existe.');
      } finally {
        setPostLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Link to="/" className={postStyles.backLink}>
        ← Volver al inicio
      </Link>

      {postLoading && <div className={postStyles.status}>Cargando post...</div>}
      {postError && <div className={postStyles.errorMsg}>{postError}</div>}

      {post && (
        <article className={postStyles.card} style={{ marginBottom: '1.5rem' }}>
          <div className={postStyles.cardHeader}>
            <a
              href={`mailto:${post.email}`}
              className={postStyles.usernameLink}
            >
              @{post.username}
            </a>
            <time className={postStyles.date} dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          </div>
          <p className={postStyles.content}>{post.content}</p>
        </article>
      )}

      {!postLoading && !postError && post && (
        <>
          <CommentForm onSubmit={addComment} />
          <h2 className={commentStyles.sectionTitle}>
            Comentarios ({comments.length})
          </h2>
          <CommentList
            comments={comments}
            loading={commentsLoading}
            error={commentsError}
          />
        </>
      )}
    </div>
  );
};

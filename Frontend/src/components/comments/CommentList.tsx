import type { Comment } from '../../types/comment.types';
import { CommentCard } from './CommentCard';
import styles from './comments.module.css';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export const CommentList = ({ comments, loading, error }: CommentListProps) => {
  if (loading) {
    return <div className={styles.status}>Cargando comentarios...</div>;
  }
  if (error) {
    return <div className={styles.errorMsg}>{error}</div>;
  }
  if (comments.length === 0) {
    return (
      <div className={styles.status}>
        Aún no hay comentarios. ¡Sé el primero en comentar!
      </div>
    );
  }
  return (
    <div className={styles.list}>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

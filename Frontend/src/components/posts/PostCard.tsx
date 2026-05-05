import { Link } from 'react-router-dom';
import type { Post } from '../../types/post.types';
import styles from './posts.module.css';

interface PostCardProps {
  post: Post;
}

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.username}>@{post.username}</span>
        <time className={styles.date} dateTime={post.createdAt}>
          {formatDate(post.createdAt)}
        </time>
      </div>
      <p className={styles.preview}>{post.contentPreview}</p>
      <div className={styles.cardFooter}>
        <Link to={`/posts/${post.id}`} className={styles.linkMore}>
          Ver más →
        </Link>
      </div>
    </article>
  );
};

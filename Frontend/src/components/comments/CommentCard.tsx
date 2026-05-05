import { useState } from 'react';
import type { Comment } from '../../types/comment.types';
import styles from './comments.module.css';

interface CommentCardProps {
  comment: Comment;
}

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const isPreviewTruncated = (comment: Comment): boolean =>
  comment.content.length > comment.contentPreview.length;

export const CommentCard = ({ comment }: CommentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const truncated = isPreviewTruncated(comment);

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.username}>@{comment.username}</span>
        <time className={styles.date} dateTime={comment.createdAt}>
          {formatDate(comment.createdAt)}
        </time>
      </div>
      <p className={expanded ? styles.content : styles.preview}>
        {expanded ? comment.content : comment.contentPreview}
      </p>
      {truncated && (
        <div className={styles.cardFooter}>
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setExpanded(v => !v)}
          >
            {expanded ? 'Ver menos ↑' : 'Ver más ↓'}
          </button>
        </div>
      )}
    </article>
  );
};

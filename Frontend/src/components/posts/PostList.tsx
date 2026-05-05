import type { Post } from '../../types/post.types';
import { PostCard } from './PostCard';
import styles from './posts.module.css';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const PostList = ({ posts, loading, error }: PostListProps) => {
  if (loading) {
    return <div className={styles.status}>Cargando posts...</div>;
  }
  if (error) {
    return <div className={styles.errorMsg}>{error}</div>;
  }
  if (posts.length === 0) {
    return (
      <div className={styles.status}>
        No hay posts aún. ¡Sé el primero en publicar!
      </div>
    );
  }
  return (
    <div className={styles.list}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

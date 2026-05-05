import { usePosts } from '../hooks/usePosts';
import { PostForm } from '../components/posts/PostForm';
import { PostList } from '../components/posts/PostList';
import styles from '../components/posts/posts.module.css';

export const HomePage = () => {
  const { posts, loading, error, addPost } = usePosts();

  return (
    <div>
      <PostForm onSubmit={addPost} />
      <h2 className={styles.sectionTitle}>Posts recientes</h2>
      <PostList posts={posts} loading={loading} error={error} />
    </div>
  );
};

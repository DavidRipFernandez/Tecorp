import { Link } from 'react-router-dom';
import styles from './layout.module.css';

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.navBrand}>
          ProjectBlog
        </Link>
      </div>
    </nav>
  );
};

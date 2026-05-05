import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import styles from './layout.module.css';

export const AppLayout = () => {
  return (
    <div className={styles.appContainer}>
      <NavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import styles from './index.module.scss';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
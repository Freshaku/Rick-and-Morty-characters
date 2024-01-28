import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import logo from '../../assets/images/logo.png';

interface HeaderProps {
  className?: string;
}

const Header:React.FC<HeaderProps> = ({ className }) => (
  <header className={classNames(styles.header, className )}>
    <img src={logo} alt="logo" className={styles.image} />
  </header>
);

export default Header;

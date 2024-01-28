import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container:React.FC<ContainerProps> = ({ children, className }) => (
  <div className={classNames(styles.container, className)}>
    {children}
  </div>
);

export default Container;

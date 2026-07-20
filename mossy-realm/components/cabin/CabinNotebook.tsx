import type { ReactNode } from 'react';
import { StationerySurface } from '@/components/mossy-ui';
import styles from './CabinNotebook.module.css';

interface CabinNotebookProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

/**
 * The Cabin's shared page surface.
 *
 * It reuses Fieldwork's faint engineering grid, then softens it with
 * a warmer moss surface and notebook details local to the Cabin.
 */
export default function CabinNotebook({
  title,
  subtitle,
  children,
  className = '',
}: CabinNotebookProps) {
  return (
    <StationerySurface
      as="article"
      role="personal-graph-notebook"
      className={`${styles.notebook} ${className}`}
    >
      <header className={styles.notebookHeader}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </header>
      <div className={styles.headerRule} aria-hidden="true" />
      {children}
    </StationerySurface>
  );
}

import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  className?: string;
  marginTop?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '16px', rounded = false, className = '', marginTop }) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius: rounded ? '999px' : '4px',
    marginTop
  };
  return <div className={`skeleton shimmer ${className}`} style={style} aria-hidden="true" />;
};

export default Skeleton;

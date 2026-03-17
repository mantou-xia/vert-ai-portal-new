import React from 'react';
import { getAssetPath } from '../../utils/path';
import './CTAButton.css';

export interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  /** 按钮文字，默认「立即开始」 */
  children?: React.ReactNode;
}

/**
 * 立即开始按钮 - 按 Figma 设计稿（node 380-2686）实现
 * 背景 #aeff21，圆角 100px，带箭头图标
 */
const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  className = '',
  children = '立即开始',
}) => {
  return (
    <button
      type="button"
      className={`cta-button ${className}`.trim()}
      onClick={onClick}
    >
      <span className="cta-button__text">{children}</span>
      <span className="cta-button__icon" aria-hidden>
        <img src={getAssetPath('/images/icons/fde/箭头.svg')} alt="" />
      </span>
    </button>
  );
};

export default CTAButton;

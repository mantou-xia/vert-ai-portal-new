import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './CTAButton.css';

type SizeValue = number | string;

export interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  width?: SizeValue;
  height?: SizeValue;
  fontSize?: SizeValue;
}

function toCssSize(value: SizeValue): string {
  return typeof value === 'number' ? `${value}px` : value;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  className = '',
  children,
  width,
  height,
  fontSize,
}) => {
  const { t } = useTranslation();
  const content = children ?? t('common.ctaStart');
  const style: React.CSSProperties & {
    '--cta-button-width'?: string;
    '--cta-button-height'?: string;
    '--cta-button-font-size'?: string;
  } = {};

  if (width !== undefined) {
    style['--cta-button-width'] = toCssSize(width);
  }
  if (height !== undefined) {
    style['--cta-button-height'] = toCssSize(height);
  }
  if (fontSize !== undefined) {
    style['--cta-button-font-size'] = toCssSize(fontSize);
  }

  return (
    <button
      type="button"
      className={`cta-button ${className}`.trim()}
      onClick={onClick}
      style={style}
    >
      <span className="cta-button__text">{content}</span>
      <span className="cta-button__icon" aria-hidden>
        <img src={getAssetPath('/images/icons/fde/箭头.svg')} alt="" />
      </span>
    </button>
  );
};

export default CTAButton;

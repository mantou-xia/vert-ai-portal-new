import React from 'react';
import { getAssetPath } from '../../utils/path';
import './PartnerCtaButton.css';

export interface PartnerCtaButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const PartnerCtaButton: React.FC<PartnerCtaButtonProps> = ({
  className = '',
  type = 'button',
  onClick,
}) => {
  const mergedClassName = ['partner-cta-button', className].filter(Boolean).join(' ');

  return (
    <button type={type} className={mergedClassName} onClick={onClick}>
      成为合作伙伴
      <span className="partner-cta-button__icon" aria-hidden>
        <img src={getAssetPath('/images/icons/fde/箭头.svg')} alt="" />
      </span>
    </button>
  );
};

export default PartnerCtaButton;


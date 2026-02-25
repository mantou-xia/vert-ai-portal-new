import React from 'react';
import { Typography } from 'antd';
import './SectionTitle.css';

const { Title, Paragraph } = Typography;

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  level = 2 
}) => {
  return (
    <div className="common-section-title">
      <Title level={level} className="common-section-title-text">
        {title}
      </Title>
      {subtitle && (
        <Paragraph className="common-section-subtitle">
          {subtitle}
        </Paragraph>
      )}
    </div>
  );
};

export default SectionTitle;

import React from 'react';
import { Row, Col, Card, Timeline } from 'antd';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/common/SectionTitle';
import { getAssetPath } from '../utils/path';

const FDEPage: React.FC = () => {
  const { t } = useTranslation();

  const fdeSteps = [
    {
      key: 'consult',
      icon: getAssetPath('/images/icons/fde-consult.png'),
      title: t('fde.consult.title'),
      description: t('fde.consult.description'),
    },
    {
      key: 'develop',
      icon: getAssetPath('/images/icons/fde-develop.png'),
      title: t('fde.develop.title'),
      description: t('fde.develop.description'),
    },
    {
      key: 'deploy',
      icon: getAssetPath('/images/icons/fde-deploy.png'),
      title: t('fde.deploy.title'),
      description: t('fde.deploy.description'),
    },
    {
      key: 'operate',
      icon: getAssetPath('/images/icons/fde-operate.png'),
      title: t('fde.operate.title'),
      description: t('fde.operate.description'),
    },
  ];

  return (
    <div style={{ padding: '80px 24px' }}>
      <div className="container">
        aaa
        <SectionTitle 
          title={t('fde.title')} 
          subtitle={t('fde.subtitle')}
        />
        
        <Row gutter={[24, 24]} style={{ marginTop: 48 }}>
          {fdeSteps.map((step, index) => (
            <Col xs={24} sm={12} md={6} key={step.key}>
              <Card style={{ height: '100%', textAlign: 'center' }}>
                <div style={{ marginBottom: 16, minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={step.icon} 
                    alt={step.title}
                    style={{ width: 64, height: 64, objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  background: '#1890ff', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                <h3 style={{ marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{step.description}</p>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: 64, maxWidth: 800, margin: '64px auto 0' }}>
          <Timeline
            items={fdeSteps.map((step) => ({
              children: (
                <div>
                  <h4>{step.title}</h4>
                  <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{step.description}</p>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default FDEPage;

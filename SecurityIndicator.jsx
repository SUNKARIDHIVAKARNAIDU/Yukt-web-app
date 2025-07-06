import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicator = ({ currentLanguage }) => {
  const translations = {
    en: {
      secureConnection: 'Secure Connection',
      dataProtection: 'Your data is protected with end-to-end encryption',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      gdprCompliant: 'GDPR Compliant',
      sslSecured: 'SSL Secured'
    },
    es: {
      secureConnection: 'Conexión Segura',
      dataProtection: 'Tus datos están protegidos con cifrado de extremo a extremo',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      gdprCompliant: 'Cumple con GDPR',
      sslSecured: 'Protegido con SSL'
    }
  };

  const t = translations[currentLanguage];

  const securityFeatures = [
    {
      icon: 'Shield',
      label: t.sslSecured,
      color: 'text-success'
    },
    {
      icon: 'Lock',
      label: t.gdprCompliant,
      color: 'text-primary'
    }
  ];

  return (
    <div className="mt-8 p-4 bg-success-50 border border-success-200 rounded-lg">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="font-semibold text-success-700">
          {t.secureConnection}
        </h3>
      </div>
      
      <p className="text-sm text-success-600 mb-4">
        {t.dataProtection}
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name={feature.icon} size={16} className={feature.color} />
            <span className="text-xs text-text-secondary">
              {feature.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <button className="text-primary hover:text-primary-700 transition-micro">
          {t.privacyPolicy}
        </button>
        <button className="text-primary hover:text-primary-700 transition-micro">
          {t.termsOfService}
        </button>
      </div>
    </div>
  );
};

export default SecurityIndicator;
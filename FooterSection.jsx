import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      yuktApp: "Yukt App",
      tagline: "Connecting campus communities",
      quickLinks: "Quick Links",
      home: "Home",
      aboutUs: "About Us",
      features: "Features",
      pricing: "Pricing",
      support: "Support",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
      documentation: "Documentation",
      community: "Community Forum",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
      followUs: "Follow Us",
      newsletter: "Stay Updated",
      newsletterDesc: "Get the latest updates and campus community insights",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      allRightsReserved: "All rights reserved.",
      madeWith: "Made with",
      forStudents: "for students"
    },
    es: {
      yuktApp: "Yukt App",
      tagline: "Conectando comunidades universitarias",
      quickLinks: "Enlaces Rápidos",
      home: "Inicio",
      aboutUs: "Acerca de Nosotros",
      features: "Características",
      pricing: "Precios",
      support: "Soporte",
      helpCenter: "Centro de Ayuda",
      contactUs: "Contáctanos",
      documentation: "Documentación",
      community: "Foro de la Comunidad",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      cookies: "Política de Cookies",
      followUs: "Síguenos",
      newsletter: "Mantente Actualizado",
      newsletterDesc: "Obtén las últimas actualizaciones e información de la comunidad universitaria",
      emailPlaceholder: "Ingresa tu email",
      subscribe: "Suscribirse",
      allRightsReserved: "Todos los derechos reservados.",
      madeWith: "Hecho con",
      forStudents: "para estudiantes"
    }
  };

  const t = translations[currentLanguage];

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' }
  ];

  const quickLinks = [
    { label: t.home, path: '/landing-page' },
    { label: t.aboutUs, path: '#' },
    { label: t.features, path: '#' },
    { label: t.pricing, path: '#' }
  ];

  const supportLinks = [
    { label: t.helpCenter, path: '#' },
    { label: t.contactUs, path: '#' },
    { label: t.documentation, path: '#' },
    { label: t.community, path: '#' }
  ];

  const legalLinks = [
    { label: t.privacy, path: '#' },
    { label: t.terms, path: '#' },
    { label: t.cookies, path: '#' }
  ];

  return (
    <footer className="bg-text-primary text-text-inverse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold font-heading">
                {t.yuktApp}
              </span>
            </div>
            <p className="text-text-inverse/80 mb-6 leading-relaxed">
              {t.tagline}
            </p>
            
            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3">{t.followUs}</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 bg-text-inverse/10 hover:bg-primary rounded-lg flex items-center justify-center transition-micro"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-text-inverse/80 hover:text-text-inverse transition-micro"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.support}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-text-inverse/80 hover:text-text-inverse transition-micro"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.newsletter}</h3>
            <p className="text-text-inverse/80 mb-4 text-sm">
              {t.newsletterDesc}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-2 bg-text-inverse/10 border border-text-inverse/20 rounded-lg text-text-inverse placeholder-text-inverse/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-full px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg font-medium transition-micro">
                {t.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="py-6 border-t border-text-inverse/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  className="text-sm text-text-inverse/60 hover:text-text-inverse transition-micro"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-text-inverse/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-text-inverse/60">
              © {currentYear} {t.yuktApp}. {t.allRightsReserved}
            </p>
            <p className="text-sm text-text-inverse/60 flex items-center">
              {t.madeWith} <Icon name="Heart" size={16} className="text-error mx-1 fill-current" /> {t.forStudents}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
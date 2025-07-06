import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      title: "Connect. Engage. Thrive.",
      subtitle: "Join your campus community",
      description: "Discover clubs, attend events, and build lasting connections with fellow students. Your college experience starts here.",
      getStarted: "Get Started",
      learnMore: "Learn More"
    },
    es: {
      title: "Conecta. Participa. Prospera.",
      subtitle: "Únete a tu comunidad universitaria",
      description: "Descubre clubes, asiste a eventos y construye conexiones duraderas con compañeros estudiantes. Tu experiencia universitaria comienza aquí.",
      getStarted: "Comenzar",
      learnMore: "Saber Más"
    }
  };

  const t = translations[currentLanguage];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-surface to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl text-secondary font-medium mb-4">
              {t.subtitle}
            </p>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl">
              {t.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate('/authentication-login-register')}
                className="w-full sm:w-auto"
              >
                {t.getStarted}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                {t.learnMore}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating in campus environment"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
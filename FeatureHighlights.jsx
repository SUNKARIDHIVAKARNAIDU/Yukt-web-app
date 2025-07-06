import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureHighlights = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      title: "Everything You Need for Campus Engagement",
      subtitle: "Powerful features designed to enhance your college experience",
      eventTitle: "Event Discovery",
      eventDesc: "Never miss out on campus activities. Discover events tailored to your interests and RSVP with ease.",
      chatTitle: "Real-time Communication",
      chatDesc: "Connect instantly with clubs and fellow students through our integrated messaging system.",
      analyticsTitle: "Engagement Analytics",
      analyticsDesc: "Clubs can track their reach, engagement, and community growth with detailed insights.",
      communityTitle: "Community Building",
      communityDesc: "Foster meaningful connections and build lasting relationships within your campus community.",
      discoverTitle: "Smart Discovery",
      discoverDesc: "AI-powered recommendations help you find clubs and events that match your interests perfectly.",
      managementTitle: "Easy Management",
      managementDesc: "Streamlined tools for clubs to manage members, organize events, and track their impact."
    },
    es: {
      title: "Todo Lo Que Necesitas Para La Participación Universitaria",
      subtitle: "Características poderosas diseñadas para mejorar tu experiencia universitaria",
      eventTitle: "Descubrimiento de Eventos",
      eventDesc: "Nunca te pierdas las actividades del campus. Descubre eventos adaptados a tus intereses y confirma asistencia fácilmente.",
      chatTitle: "Comunicación en Tiempo Real",
      chatDesc: "Conecta instantáneamente con clubes y compañeros estudiantes a través de nuestro sistema de mensajería integrado.",
      analyticsTitle: "Analíticas de Participación",
      analyticsDesc: "Los clubes pueden rastrear su alcance, participación y crecimiento comunitario con información detallada.",
      communityTitle: "Construcción de Comunidad",
      communityDesc: "Fomenta conexiones significativas y construye relaciones duraderas dentro de tu comunidad universitaria.",
      discoverTitle: "Descubrimiento Inteligente",
      discoverDesc: "Las recomendaciones impulsadas por IA te ayudan a encontrar clubes y eventos que coincidan perfectamente con tus intereses.",
      managementTitle: "Gestión Fácil",
      managementDesc: "Herramientas simplificadas para que los clubes gestionen miembros, organicen eventos y rastreen su impacto."
    }
  };

  const t = translations[currentLanguage];

  const features = [
    {
      id: 'events',
      title: t.eventTitle,
      description: t.eventDesc,
      icon: 'Calendar',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'primary'
    },
    {
      id: 'chat',
      title: t.chatTitle,
      description: t.chatDesc,
      icon: 'MessageCircle',
      image: 'https://images.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png',
      color: 'secondary'
    },
    {
      id: 'analytics',
      title: t.analyticsTitle,
      description: t.analyticsDesc,
      icon: 'BarChart3',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'accent'
    },
    {
      id: 'community',
      title: t.communityTitle,
      description: t.communityDesc,
      icon: 'Users',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'success'
    },
    {
      id: 'discovery',
      title: t.discoverTitle,
      description: t.discoverDesc,
      icon: 'Search',
      image: 'https://images.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg',
      color: 'primary'
    },
    {
      id: 'management',
      title: t.managementTitle,
      description: t.managementDesc,
      icon: 'Settings',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'secondary'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        text: 'text-primary',
        border: 'border-primary-200'
      },
      secondary: {
        bg: 'bg-secondary-50',
        text: 'text-secondary',
        border: 'border-secondary-200'
      },
      accent: {
        bg: 'bg-accent-50',
        text: 'text-accent',
        border: 'border-accent-200'
      },
      success: {
        bg: 'bg-success-50',
        text: 'text-success',
        border: 'border-success-200'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-16 lg:py-24 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const colors = getColorClasses(feature.color);
            
            return (
              <div
                key={feature.id}
                className="group bg-surface rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-primary-200"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border}`}>
                    <Icon name={feature.icon} size={24} className={colors.text} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
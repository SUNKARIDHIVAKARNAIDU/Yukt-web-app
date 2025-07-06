import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RegistrationCards = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      title: "Choose Your Path",
      subtitle: "Select how you want to engage with your campus community",
      studentTitle: "Join as a Student",
      studentDesc: "Discover clubs, attend events, and connect with like-minded peers across your campus.",
      studentFeatures: ["Browse club activities", "RSVP to events", "Chat with clubs", "Track your interests"],
      clubTitle: "Register Your Club",
      clubDesc: "Promote your organization, manage events, and grow your community of engaged members.",
      clubFeatures: ["Create club profile", "Organize events", "Engage with students", "Track analytics"],
      adminTitle: "Admin Access",
      adminDesc: "Oversee platform activities, moderate content, and manage institutional governance.",
      adminFeatures: ["Manage clubs", "Content moderation", "Platform analytics", "User oversight"],
      getStarted: "Get Started",
      learnMore: "Learn More"
    },
    es: {
      title: "Elige Tu Camino",
      subtitle: "Selecciona cómo quieres participar en tu comunidad universitaria",
      studentTitle: "Únete como Estudiante",
      studentDesc: "Descubre clubes, asiste a eventos y conecta con compañeros afines en tu campus.",
      studentFeatures: ["Explorar actividades de clubes", "Confirmar asistencia a eventos", "Chatear con clubes", "Seguir tus intereses"],
      clubTitle: "Registra Tu Club",
      clubDesc: "Promociona tu organización, gestiona eventos y haz crecer tu comunidad de miembros comprometidos.",
      clubFeatures: ["Crear perfil del club", "Organizar eventos", "Interactuar con estudiantes", "Seguir analíticas"],
      adminTitle: "Acceso de Administrador",
      adminDesc: "Supervisa las actividades de la plataforma, modera contenido y gestiona la gobernanza institucional.",
      adminFeatures: ["Gestionar clubes", "Moderación de contenido", "Analíticas de plataforma", "Supervisión de usuarios"],
      getStarted: "Comenzar",
      learnMore: "Saber Más"
    }
  };

  const t = translations[currentLanguage];

  const registrationOptions = [
    {
      id: 'student',
      title: t.studentTitle,
      description: t.studentDesc,
      features: t.studentFeatures,
      icon: 'GraduationCap',
      image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-primary to-primary-600',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary',
      role: 'student'
    },
    {
      id: 'club',
      title: t.clubTitle,
      description: t.clubDesc,
      features: t.clubFeatures,
      icon: 'Users',
      image: 'https://images.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg',
      gradient: 'from-secondary to-secondary-600',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary',
      role: 'club'
    },
    {
      id: 'admin',
      title: t.adminTitle,
      description: t.adminDesc,
      features: t.adminFeatures,
      icon: 'Shield',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      gradient: 'from-accent to-accent-600',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent',
      role: 'admin'
    }
  ];

  const handleRegistration = (role) => {
    localStorage.setItem('registrationRole', role);
    navigate('/authentication-login-register');
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
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

        {/* Registration Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrationOptions.map((option) => (
            <div
              key={option.id}
              className="group relative bg-surface rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-primary-200"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${option.gradient} opacity-20`}></div>
                
                {/* Icon Badge */}
                <div className={`absolute top-4 left-4 w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon name={option.icon} size={24} className={option.textColor} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {option.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {option.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-text-secondary">
                      <Icon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleRegistration(option.role)}
                    className="flex-1"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {t.getStarted}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                  >
                    {t.learnMore}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationCards;
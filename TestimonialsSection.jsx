import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const translations = {
    en: {
      title: "What Our Community Says",
      subtitle: "Real experiences from students, clubs, and administrators",
      student: "Student",
      clubLeader: "Club Leader",
      administrator: "Administrator"
    },
    es: {
      title: "Lo Que Dice Nuestra Comunidad",
      subtitle: "Experiencias reales de estudiantes, clubes y administradores",
      student: "Estudiante",
      clubLeader: "Líder de Club",
      administrator: "Administrador"
    }
  };

  const t = translations[currentLanguage];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: t.student,
      university: "Stanford University",
      content: "Yukt App completely transformed how I engage with campus life. I've discovered amazing clubs I never knew existed and made lifelong friends through the events I found here.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: t.clubLeader,
      university: "MIT",
      content: "As president of the Robotics Club, Yukt App has been invaluable. Our event attendance increased by 300% and member engagement is at an all-time high. The analytics help us understand our community better.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: t.administrator,
      university: "Harvard University",
      content: "The platform has streamlined our club oversight process significantly. Content moderation tools and analytics give us insights we never had before, helping us better support student organizations.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: t.student,
      university: "UC Berkeley",
      content: "The real-time chat feature is amazing! I can instantly connect with club organizers and get quick answers to my questions. It\'s made joining new activities so much easier.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 5,
      name: "Jessica Park",
      role: t.clubLeader,
      university: "Yale University",
      content: "Managing our Photography Club has never been easier. From event creation to member communication, everything is centralized and intuitive. Our community has grown tremendously!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-accent fill-current' : 'text-border'}
      />
    ));
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

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-surface rounded-2xl shadow-card p-8 lg:p-12 border border-border">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-primary-100"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Quote */}
                <div className="mb-6">
                  <Icon name="Quote" size={32} className="text-primary-200 mb-4 mx-auto lg:mx-0" />
                  <p className="text-lg lg:text-xl text-text-primary leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center lg:justify-start mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                {/* Author Info */}
                <div>
                  <h4 className="text-xl font-semibold text-text-primary">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-text-secondary">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].university}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-micro shadow-md"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-micro shadow-md"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-micro ${
                  index === currentTestimonial
                    ? 'bg-primary' :'bg-border hover:bg-primary-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
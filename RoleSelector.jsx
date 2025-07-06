import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, currentLanguage }) => {
  const translations = {
    en: {
      student: 'Student',
      club: 'Club',
      admin: 'Admin',
      studentDesc: 'Discover clubs and events',
      clubDesc: 'Manage your organization',
      adminDesc: 'Platform administration'
    },
    es: {
      student: 'Estudiante',
      club: 'Club',
      admin: 'Administrador',
      studentDesc: 'Descubre clubes y eventos',
      clubDesc: 'Gestiona tu organización',
      adminDesc: 'Administración de plataforma'
    }
  };

  const t = translations[currentLanguage];

  const roles = [
    {
      id: 'student',
      label: t.student,
      description: t.studentDesc,
      icon: 'GraduationCap',
      color: 'text-primary'
    },
    {
      id: 'club',
      label: t.club,
      description: t.clubDesc,
      icon: 'Building',
      color: 'text-secondary'
    },
    {
      id: 'admin',
      label: t.admin,
      description: t.adminDesc,
      icon: 'Shield',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onRoleChange(role.id)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
            selectedRole === role.id
              ? 'border-primary bg-primary-50 shadow-md'
              : 'border-border hover:border-primary-300 bg-surface'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${
              selectedRole === role.id ? 'bg-primary text-white' : 'bg-background'
            }`}>
              <Icon 
                name={role.icon} 
                size={20} 
                className={selectedRole === role.id ? 'text-white' : role.color}
              />
            </div>
            <h3 className={`font-semibold ${
              selectedRole === role.id ? 'text-primary' : 'text-text-primary'
            }`}>
              {role.label}
            </h3>
          </div>
          <p className="text-sm text-text-secondary">
            {role.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ 
  isLogin, 
  selectedRole, 
  onToggleMode, 
  onSubmit, 
  currentLanguage,
  loading 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organizationName: '',
    institutionId: '',
    phone: '',
    studentId: '',
    department: '',
    year: '',
    clubCategory: '',
    description: '',
    website: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const translations = {
    en: {
      login: 'Login',
      register: 'Register',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      organizationName: 'Organization Name',
      institutionId: 'Institution ID',
      phone: 'Phone Number',
      studentId: 'Student ID',
      department: 'Department',
      year: 'Year of Study',
      clubCategory: 'Club Category',
      description: 'Club Description',
      website: 'Website URL',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don\'t have an account?",
      hasAccount: 'Already have an account?',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      orContinueWith: 'Or continue with',
      google: 'Google',
      microsoft: 'Microsoft',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      veryStrong: 'Very Strong',
      loginToAccount: 'Login to your account',
      createAccount: 'Create your account',
      welcomeBack: 'Welcome back!',
      joinCommunity: 'Join our community',
      mockCredentials: 'Use mock credentials for testing'
    },
    es: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      firstName: 'Nombre',
      lastName: 'Apellido',
      organizationName: 'Nombre de la Organización',
      institutionId: 'ID de Institución',
      phone: 'Número de Teléfono',
      studentId: 'ID de Estudiante',
      department: 'Departamento',
      year: 'Año de Estudio',
      clubCategory: 'Categoría del Club',
      description: 'Descripción del Club',
      website: 'URL del Sitio Web',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      hasAccount: '¿Ya tienes una cuenta?',
      signUp: 'Registrarse',
      signIn: 'Iniciar Sesión',
      orContinueWith: 'O continúa con',
      google: 'Google',
      microsoft: 'Microsoft',
      passwordStrength: 'Fuerza de Contraseña',
      weak: 'Débil',
      medium: 'Medio',
      strong: 'Fuerte',
      veryStrong: 'Muy Fuerte',
      loginToAccount: 'Inicia sesión en tu cuenta',
      createAccount: 'Crea tu cuenta',
      welcomeBack: '¡Bienvenido de vuelta!',
      joinCommunity: 'Únete a nuestra comunidad',
      mockCredentials: 'Usar credenciales de prueba'
    }
  };

  const t = translations[currentLanguage];

  const mockCredentials = {
    student: { email: 'student@university.edu', password: 'Student123!' },
    club: { email: 'club@university.edu', password: 'Club123!' },
    admin: { email: 'admin@university.edu', password: 'Admin123!' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    const strengthTexts = [t.weak, t.weak, t.medium, t.strong, t.veryStrong];
    return strengthTexts[passwordStrength] || t.weak;
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    return colors[passwordStrength] || 'bg-error';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fillMockCredentials = () => {
    const credentials = mockCredentials[selectedRole];
    setFormData(prev => ({
      ...prev,
      email: credentials.email,
      password: credentials.password
    }));
  };

  const renderStudentFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={t.firstName}
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder={t.lastName}
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          required
        />
      </div>
      <Input
        type="text"
        placeholder={t.studentId}
        value={formData.studentId}
        onChange={(e) => handleInputChange('studentId', e.target.value)}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={t.department}
          value={formData.department}
          onChange={(e) => handleInputChange('department', e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder={t.year}
          value={formData.year}
          onChange={(e) => handleInputChange('year', e.target.value)}
          required
        />
      </div>
    </>
  );

  const renderClubFields = () => (
    <>
      <Input
        type="text"
        placeholder={t.organizationName}
        value={formData.organizationName}
        onChange={(e) => handleInputChange('organizationName', e.target.value)}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={t.clubCategory}
          value={formData.clubCategory}
          onChange={(e) => handleInputChange('clubCategory', e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder={t.phone}
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          required
        />
      </div>
      <Input
        type="url"
        placeholder={t.website}
        value={formData.website}
        onChange={(e) => handleInputChange('website', e.target.value)}
      />
      <textarea
        placeholder={t.description}
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        rows={3}
        required
      />
    </>
  );

  const renderAdminFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={t.firstName}
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder={t.lastName}
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          required
        />
      </div>
      <Input
        type="text"
        placeholder={t.institutionId}
        value={formData.institutionId}
        onChange={(e) => handleInputChange('institutionId', e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder={t.department}
        value={formData.department}
        onChange={(e) => handleInputChange('department', e.target.value)}
        required
      />
    </>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {isLogin ? t.loginToAccount : t.createAccount}
        </h2>
        <p className="text-text-secondary">
          {isLogin ? t.welcomeBack : t.joinCommunity}
        </p>
      </div>

      {/* Mock Credentials Helper */}
      {isLogin && (
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {t.mockCredentials}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={fillMockCredentials}
            >
              Fill
            </Button>
          </div>
          <div className="mt-2 text-xs text-primary">
            Email: {mockCredentials[selectedRole]?.email}<br />
            Password: {mockCredentials[selectedRole]?.password}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role-specific fields for registration */}
        {!isLogin && (
          <div className="space-y-4">
            {selectedRole === 'student' && renderStudentFields()}
            {selectedRole === 'club' && renderClubFields()}
            {selectedRole === 'admin' && renderAdminFields()}
          </div>
        )}

        {/* Email */}
        <Input
          type="email"
          placeholder={t.email}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t.password}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Password Strength Indicator */}
        {!isLogin && formData.password && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{t.passwordStrength}</span>
              <span className={`font-medium ${
                passwordStrength >= 3 ? 'text-success' : 
                passwordStrength >= 2 ? 'text-warning' : 'text-error'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Confirm Password */}
        {!isLogin && (
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        )}

        {/* Forgot Password Link */}
        {isLogin && (
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-700 transition-micro"
            >
              {t.forgotPassword}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="primary"
          fullWidth
          loading={loading}
          type="submit"
        >
          {isLogin ? t.signIn : t.signUp}
        </Button>

        {/* Social Login (Students only) */}
        {selectedRole === 'student' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-muted">
                  {t.orContinueWith}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Chrome"
                onClick={() => {}}
              >
                {t.google}
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Laptop"
                onClick={() => {}}
              >
                {t.microsoft}
              </Button>
            </div>
          </>
        )}

        {/* Toggle Mode */}
        <div className="text-center pt-4">
          <span className="text-text-secondary text-sm">
            {isLogin ? t.noAccount : t.hasAccount}
          </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="ml-2 text-sm text-primary hover:text-primary-700 font-medium transition-micro"
          >
            {isLogin ? t.signUp : t.signIn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = ({ currentLanguage }) => {
  const [healthMetrics, setHealthMetrics] = useState({});

  const translations = {
    en: {
      title: 'System Health',
      serverStatus: 'Server Status',
      databaseStatus: 'Database',
      apiResponse: 'API Response',
      activeUsers: 'Active Users',
      memoryUsage: 'Memory Usage',
      cpuUsage: 'CPU Usage',
      operational: 'Operational',
      warning: 'Warning',
      critical: 'Critical',
      ms: 'ms',
      users: 'users online'
    },
    es: {
      title: 'Estado del Sistema',
      serverStatus: 'Estado del Servidor',
      databaseStatus: 'Base de Datos',
      apiResponse: 'Respuesta API',
      activeUsers: 'Usuarios Activos',
      memoryUsage: 'Uso de Memoria',
      cpuUsage: 'Uso de CPU',
      operational: 'Operacional',
      warning: 'Advertencia',
      critical: 'Crítico',
      ms: 'ms',
      users: 'usuarios en línea'
    }
  };

  const t = translations[currentLanguage];

  useEffect(() => {
    const updateMetrics = () => {
      setHealthMetrics({
        serverStatus: {
          status: 'operational',
          uptime: '99.9%',
          lastCheck: new Date()
        },
        database: {
          status: 'operational',
          responseTime: Math.floor(Math.random() * 50) + 10,
          connections: Math.floor(Math.random() * 100) + 50
        },
        apiResponse: {
          status: Math.random() > 0.8 ? 'warning' : 'operational',
          avgTime: Math.floor(Math.random() * 200) + 100,
          successRate: (Math.random() * 5 + 95).toFixed(1)
        },
        activeUsers: {
          count: Math.floor(Math.random() * 500) + 200,
          peak: 847,
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        resources: {
          memory: Math.floor(Math.random() * 30) + 45,
          cpu: Math.floor(Math.random() * 40) + 20,
          storage: Math.floor(Math.random() * 20) + 60
        }
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'bg-error';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.title}</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Server Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(healthMetrics.serverStatus?.status)} 
                  size={16} 
                  className={getStatusColor(healthMetrics.serverStatus?.status)}
                />
                <span className="text-sm font-medium text-text-primary">{t.serverStatus}</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(healthMetrics.serverStatus?.status)}`}>
                {t[healthMetrics.serverStatus?.status] || t.operational}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(healthMetrics.database?.status)} 
                  size={16} 
                  className={getStatusColor(healthMetrics.database?.status)}
                />
                <span className="text-sm font-medium text-text-primary">{t.databaseStatus}</span>
              </div>
              <span className="text-sm text-text-secondary">
                {healthMetrics.database?.responseTime}{t.ms}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(healthMetrics.apiResponse?.status)} 
                  size={16} 
                  className={getStatusColor(healthMetrics.apiResponse?.status)}
                />
                <span className="text-sm font-medium text-text-primary">{t.apiResponse}</span>
              </div>
              <span className="text-sm text-text-secondary">
                {healthMetrics.apiResponse?.avgTime}{t.ms}
              </span>
            </div>
          </div>

          {/* Resource Usage */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{t.activeUsers}</span>
              <span className="text-sm text-text-secondary">
                {healthMetrics.activeUsers?.count} {t.users}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{t.memoryUsage}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {healthMetrics.resources?.memory}%
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(healthMetrics.resources?.memory)}`}
                    style={{ width: `${healthMetrics.resources?.memory}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{t.cpuUsage}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {healthMetrics.resources?.cpu}%
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(healthMetrics.resources?.cpu)}`}
                    style={{ width: `${healthMetrics.resources?.cpu}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
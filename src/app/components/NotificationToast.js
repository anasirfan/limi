'use client';

import { useState, useEffect } from 'react';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiXCircle, 
  FiInfo,
  FiX,
  FiAlertTriangle
} from 'react-icons/fi';

const NotificationToast = ({ 
  notifications, 
  onDismiss, 
  position = 'top-right',
  maxVisible = 5 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'error':
        return <FiXCircle className="w-5 h-5" />;
      case 'warning':
        return <FiAlertTriangle className="w-5 h-5" />;
      case 'info':
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: 'text-green-500',
          progress: 'bg-green-500'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: 'text-red-500',
          progress: 'bg-red-500'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: 'text-yellow-500',
          progress: 'bg-yellow-500'
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'text-blue-500',
          progress: 'bg-blue-500'
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
      default:
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
    }
  };

  const ToastItem = ({ notification, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const styles = getStyles(notification.type);

    useEffect(() => {
      // Animate in
      const timer = setTimeout(() => setIsVisible(true), 50 * index);
      return () => clearTimeout(timer);
    }, [index]);

    useEffect(() => {
      if (notification.autoClose && notification.duration) {
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev - (100 / (notification.duration / 100));
            if (newProgress <= 0) {
              clearInterval(interval);
              handleDismiss();
              return 0;
            }
            return newProgress;
          });
        }, 100);

        return () => clearInterval(interval);
      }
    }, [notification.autoClose, notification.duration]);

    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => onDismiss(notification.id), 300);
    };

    return (
      <div
        className={`
          transform transition-all duration-300 ease-in-out mb-3
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <div className={`
          relative overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm
          ${styles.container}
          max-w-sm w-full p-4
        `}>
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${styles.icon}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="text-sm font-semibold mb-1">
                  {notification.title}
                </h4>
              )}
              <p className="text-sm opacity-90">
                {notification.message}
              </p>
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-sm font-medium underline hover:no-underline"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            {notification.dismissible !== false && (
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Progress bar */}
          {notification.autoClose && notification.duration && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10">
              <div
                className={`h-full transition-all duration-100 ease-linear ${styles.progress}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={`fixed z-50 ${getPositionStyles()}`}>
      <div className="space-y-0">
        {visibleNotifications.map((notification, index) => (
          <ToastItem
            key={notification.id}
            notification={notification}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({
    type = 'info',
    title,
    message,
    duration = 5000,
    autoClose = true,
    dismissible = true,
    action
  }) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type,
      title,
      message,
      duration,
      autoClose,
      dismissible,
      action,
      timestamp: new Date()
    };

    setNotifications(prev => [notification, ...prev]);
    return id;
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (message, options = {}) => 
    addNotification({ type: 'success', message, ...options });

  const error = (message, options = {}) => 
    addNotification({ type: 'error', message, autoClose: false, ...options });

  const warning = (message, options = {}) => 
    addNotification({ type: 'warning', message, ...options });

  const info = (message, options = {}) => 
    addNotification({ type: 'info', message, ...options });

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info
  };
};

export default NotificationToast;

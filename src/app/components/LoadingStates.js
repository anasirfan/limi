'use client';

import { useState, useEffect } from 'react';
import { 
  FiLoader, 
  FiRefreshCw, 
  FiUpload,
  FiDownload,
  FiSearch,
  FiFilter
} from 'react-icons/fi';

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  animate = true 
}) => {
  return (
    <div 
      className={`
        ${width} ${height} ${rounded} bg-gray-200 
        ${animate ? 'animate-pulse' : ''} 
        ${className}
      `}
    />
  );
};

// Card Skeleton for asset grid
export const AssetCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <SkeletonLoader height="h-4" width="w-3/4" />
        <SkeletonLoader height="h-3" width="w-1/2" />
        <div className="flex items-center justify-between">
          <SkeletonLoader height="h-3" width="w-16" />
          <div className="flex space-x-1">
            <SkeletonLoader height="h-6" width="w-6" rounded="rounded-full" />
            <SkeletonLoader height="h-6" width="w-6" rounded="rounded-full" />
            <SkeletonLoader height="h-6" width="w-6" rounded="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-gray-200">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <SkeletonLoader height="h-4" width={index === 0 ? 'w-3/4' : 'w-full'} />
        </td>
      ))}
    </tr>
  );
};

// Spinner Components
export const Spinner = ({ 
  size = 'md', 
  color = 'blue',
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <FiLoader 
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        animate-spin 
        ${className}
      `} 
    />
  );
};

// Loading Button Component
export const LoadingButton = ({ 
  loading = false,
  children,
  loadingText = 'Loading...',
  icon: Icon,
  loadingIcon: LoadingIcon = FiLoader,
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={`
        flex items-center justify-center space-x-2 px-4 py-2 rounded-lg
        transition-all duration-200 ease-in-out
        ${loading || disabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}
        ${className}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingIcon className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

// Progress Bar Component
export const ProgressBar = ({ 
  progress = 0, 
  showPercentage = true,
  color = 'blue',
  height = 'h-2',
  className = '',
  animated = true
}) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} ${className}`}>
      <div
        className={`
          ${height} rounded-full ${colorClasses[color]}
          ${animated ? 'transition-all duration-300 ease-out' : ''}
        `}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      {showPercentage && (
        <div className="text-xs text-gray-600 mt-1 text-center">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Upload Progress Component
export const UploadProgress = ({ files = [], onCancel }) => {
  if (files.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">
          Uploading {files.length} file{files.length !== 1 ? 's' : ''}
        </h4>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="truncate text-gray-700">{file.name}</span>
              <span className="text-gray-500">{file.progress}%</span>
            </div>
            <ProgressBar 
              progress={file.progress} 
              showPercentage={false}
              color={file.status === 'error' ? 'red' : file.progress === 100 ? 'green' : 'blue'}
              height="h-1"
            />
            {file.status === 'error' && (
              <p className="text-xs text-red-600">{file.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ 
  loading = false, 
  message = 'Loading...',
  backdrop = true,
  children 
}) => {
  if (!loading) return children;

  return (
    <div className="relative">
      {children}
      <div className={`
        absolute inset-0 flex items-center justify-center z-10
        ${backdrop ? 'bg-white bg-opacity-75 backdrop-blur-sm' : ''}
      `}>
        <div className="flex flex-col items-center space-y-3">
          <Spinner size="lg" />
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Fade In Animation Component
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 'duration-500',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transition-all ${duration} ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Slide In Animation Component
export const SlideIn = ({ 
  children, 
  direction = 'left',
  delay = 0,
  duration = 'duration-500',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'left': return '-translate-x-full';
      case 'right': return 'translate-x-full';
      case 'up': return '-translate-y-full';
      case 'down': return 'translate-y-full';
      default: return '-translate-x-full';
    }
  };

  return (
    <div
      className={`
        transition-all ${duration} ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${getTransform()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Scale In Animation Component
export const ScaleIn = ({ 
  children, 
  delay = 0,
  duration = 'duration-300',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transition-all ${duration} ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Stagger Children Animation
export const StaggerChildren = ({ 
  children, 
  staggerDelay = 100,
  className = '' 
}) => {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <FadeIn key={index} delay={index * staggerDelay}>
              {child}
            </FadeIn>
          ))
        : children
      }
    </div>
  );
};

// Loading States Hook
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setLoadingError = (errorMessage) => {
    setLoading(false);
    setError(errorMessage);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    reset
  };
};

// Pulse Animation Component
export const Pulse = ({ children, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
};

// Bounce Animation Component  
export const Bounce = ({ children, className = '' }) => {
  return (
    <div className={`animate-bounce ${className}`}>
      {children}
    </div>
  );
};

export default {
  SkeletonLoader,
  AssetCardSkeleton,
  TableRowSkeleton,
  Spinner,
  LoadingButton,
  ProgressBar,
  UploadProgress,
  LoadingOverlay,
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerChildren,
  useLoadingState,
  Pulse,
  Bounce
};

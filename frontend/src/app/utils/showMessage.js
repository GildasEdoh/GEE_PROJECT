'use client';

import toast, { Toaster } from 'react-hot-toast';

// Fonction exportable pour être utilisée partout
export default function showNotification (message, type = 'default') {
  const options = {
    position: 'top-center',
    duration: 4000,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast(message, { ...options, icon: '⚠️' });
      break;
    case 'loading':
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
  }
};

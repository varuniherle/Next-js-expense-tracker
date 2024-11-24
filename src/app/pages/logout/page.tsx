'use client';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('auth_token');

    // Optionally clear cookies if used
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";

    // Redirect to login page
    router.push('/pages/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
      Logout
    </button>
  );
}

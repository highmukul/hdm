import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login page
    if (!loading && !user) {
      router.push('/login?redirected=true');
    }
  }, [user, loading, router]);

  // While loading, show a loading spinner or a blank page
  if (loading || !user) {
    return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
  }
  
  // If user is logged in, show the child components
  return children;
};

export default ProtectedRoute;
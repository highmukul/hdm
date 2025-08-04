import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';

const withCaptainProfile = (WrappedComponent) => {
  const WithCaptainProfileComponent = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        if (user.role === 'captain' && !user.isProfileComplete) {
          router.push('/captain/signup');
        }
      }
    }, [user, loading, router]);

    // Show a loading state while we check the user's profile
      if (loading || (user && user.role === 'captain' && !user.isProfileComplete)) {
      return <div className="h-screen flex items-center justify-center"><p>Loading your profile...</p></div>;
    }

    // If profile is complete, render the component
    return <WrappedComponent {...props} />;
  };
  
 WithCaptainProfileComponent.displayName = `withCaptainProfile(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
 return WithCaptainProfileComponent;
};

export default withCaptainProfile;
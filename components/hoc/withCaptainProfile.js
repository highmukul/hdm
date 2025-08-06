import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const withCaptainProfile = (WrappedComponent) => {
  const WithCaptainProfileComponent = (props) => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCaptainProfile = async () => {
        if (!authLoading && user) {
          if (user.role !== 'captain') {
            router.push('/login');
            return;
          }
          const captainDoc = await getDoc(doc(db, 'captains', user.uid));
          if (captainDoc.exists()) {
            const captainData = captainDoc.data();
            setCaptain(captainData);
            if (!captainData.isProfileComplete) {
              router.push('/captain/signup');
            }
          } else {
            router.push('/captain/signup');
          }
        } else if (!authLoading && !user) {
          router.push('/login');
        }
        setLoading(false);
      };

      fetchCaptainProfile();
    }, [user, authLoading, router]);

    if (loading || authLoading) {
      return <div className="h-screen flex items-center justify-center"><p>Loading your profile...</p></div>;
    }

    return <WrappedComponent {...props} captain={captain} />;
  };
  
  WithCaptainProfileComponent.displayName = `withCaptainProfile(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithCaptainProfileComponent;
};

export default withCaptainProfile;

import CaptainLayout from '../../components/captain/CaptainLayout';
import ProfileForm from '../../components/captain/ProfileForm';

const ProfilePage = () => {
    return (
        <CaptainLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">My Profile</h1>
                <ProfileForm />
            </div>
        </CaptainLayout>
    );
};

export default ProfilePage;

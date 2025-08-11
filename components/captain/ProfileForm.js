import { useForm } from 'react-hook-form';

const ProfileForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Your Personal Details</h2>
            <div>
                <label className="block font-medium">Full Name</label>
                <input {...register('fullName', { required: 'Full name is required' })} className="input w-full" />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
                <label className="block font-medium">Phone Number</label>
                <input {...register('phone', { required: 'Phone number is required' })} className="input w-full" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
                <label className="block font-medium">Full Address</label>
                <textarea {...register('address', { required: 'Address is required' })} className="input w-full h-24"></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Next: Vehicle Details</button>
        </form>
    );
};

export default ProfileForm;

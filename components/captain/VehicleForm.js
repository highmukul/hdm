import { useForm } from 'react-hook-form';

const VehicleForm = ({ onSubmit, onBack }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Your Vehicle Details</h2>
            <div>
                <label className="block font-medium">Vehicle Model</label>
                <input {...register('model', { required: 'Vehicle model is required' })} className="input w-full" />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>
            <div>
                <label className="block font-medium">Vehicle Registration Number</label>
                <input {...register('registrationNumber', { required: 'Registration number is required' })} className="input w-full" />
                {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>}
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="btn-secondary">Back</button>
                <button type="submit" className="btn-primary">Next: Upload Documents</button>
            </div>
        </form>
    );
};

export default VehicleForm;

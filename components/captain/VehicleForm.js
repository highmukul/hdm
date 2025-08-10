import { useForm } from 'react-hook-form';

const VehicleForm = ({ onSave }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <h2 className="text-xl font-semibold mb-4 text-center">Step 3: Vehicle Details</h2>
            <input {...register("vehicleModel", { required: true })} placeholder="Vehicle Model (e.g., Honda Activa)" className="input w-full mb-4" />
            <input {...register("licensePlate", { required: true })} placeholder="License Plate" className="input w-full mb-4" />
            <button type="submit" className="btn-primary w-full">Next</button>
        </form>
    );
};

export default VehicleForm;

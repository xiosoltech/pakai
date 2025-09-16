import React, { useState, useEffect } from 'react';
import Icon from './shared/Icon';

interface ProfileSetupProps {
    onProfileComplete: () => void;
}

interface FormData {
    fullName: string;
    dob: string;
    gender: string;
    height: string;
    weight: string;
}

interface FormErrors {
    fullName?: string;
    dob?: string;
    gender?: string;
    height?: string;
    weight?: string;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileComplete }) => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        dob: '',
        gender: '',
        height: '',
        weight: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const newErrors: FormErrors = {};
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
            if (!formData.dob) newErrors.dob = 'Date of birth is required.';
            if (!formData.gender) newErrors.gender = 'Please select a gender.';
            
            if (!formData.height) {
                newErrors.height = 'Height is required.';
            } else if (parseFloat(formData.height) <= 0) {
                newErrors.height = 'Height must be a positive number.';
            }

            if (!formData.weight) {
                newErrors.weight = 'Weight is required.';
            } else if (parseFloat(formData.weight) <= 0) {
                newErrors.weight = 'Weight must be a positive number.';
            }
            
            setErrors(newErrors);
            setIsFormValid(Object.keys(newErrors).length === 0);
        };
        validateForm();
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Saving profile:', formData);
            onProfileComplete();
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Tell Us About Yourself</h2>
            <p className="text-center text-text-secondary mb-6">This information helps us create your personalized health profile.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400 ${errors.fullName ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-accent'}`}
                        placeholder="Alex Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-text-secondary">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400 ${errors.dob ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-accent'}`}
                        />
                         {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
                    </div>
                     <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-text-secondary">Gender</label>
                        <select
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400 ${errors.gender ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-accent'}`}
                        >
                            <option value="" disabled>Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                         {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-text-secondary">Height (cm)</label>
                        <input
                            type="number"
                            id="height"
                            value={formData.height}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400 ${errors.height ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-accent'}`}
                            placeholder="175"
                        />
                         {errors.height && <p className="mt-1 text-xs text-red-500">{errors.height}</p>}
                    </div>
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-text-secondary">Weight (kg)</label>
                        <input
                            type="number"
                            id="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors hover:border-gray-400 ${errors.weight ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-brand-accent'}`}
                            placeholder="70"
                        />
                         {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight}</p>}
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Save &amp; Continue <Icon name="arrowRight" className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSetup;
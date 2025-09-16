import React from 'react';
import Card from './shared/Card';
import Icon from './shared/Icon';
import type { HealthDevice, IconName, UserProfile, Medication } from '../types';

// In a real app, this data would come from a user context or API after login.
const userProfile: UserProfile = {
    fullName: 'Alex Doe',
    email: 'alex.doe@example.com',
    dob: '1985-05-15',
    gender: 'Male',
    height: 175, // cm
    weight: 70, // kg
    bloodType: 'O+',
    medicalConditions: ['Asthma', 'Hypertension'],
    allergies: ['Penicillin', 'Peanuts'],
    medications: [
        { name: 'Lisinopril', dosage: '10mg daily' },
        { name: 'Albuterol', dosage: 'As needed' },
    ],
    lifestyle: {
        smoker: 'Never',
        alcohol: 'Socially',
        exerciseFrequency: '3-4 times a week',
    },
    emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '123-456-7890',
    },
};

const connectedDevices: HealthDevice[] = [
    { id: 'watch', name: 'Smart Watch', icon: 'watch', connected: true },
    { id: 'scale', name: 'Smart Scale', icon: 'scale', connected: true },
    { id: 'cuff', name: 'BP Cuff', icon: 'cuff', connected: false },
];

const calculateAge = (dobString: string): number => {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
    if (heightCm <= 0 || weightKg <= 0) return 'N/A';
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return bmi.toFixed(1);
};

interface ProfileDetailProps {
    label: string;
    value: string | number;
    icon: IconName;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value, icon }) => (
    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
        <Icon name={icon} className="w-6 h-6 text-brand-secondary mr-4 mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="text-md font-semibold text-text-primary">{value}</p>
        </div>
    </div>
);

const InfoListItem: React.FC<{ icon: IconName; text: React.ReactNode }> = ({ icon, text }) => (
    <div className="flex items-center text-sm text-text-secondary py-1">
        <Icon name={icon} className="w-4 h-4 mr-3 text-brand-accent" />
        <span>{text}</span>
    </div>
);

const ProfilePage: React.FC = () => {
    const age = calculateAge(userProfile.dob);
    const bmi = calculateBmi(userProfile.height, userProfile.weight);
    const bmiValue = parseFloat(bmi);
    let bmiCategory = 'N/A';
    if (!isNaN(bmiValue)) {
        if (bmiValue < 18.5) bmiCategory = 'Underweight';
        else if (bmiValue < 24.9) bmiCategory = 'Normal weight';
        else if (bmiValue < 29.9) bmiCategory = 'Overweight';
        else bmiCategory = 'Obese';
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">My Health Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-3">
                    <Card>
                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                className="h-24 w-24 rounded-full mr-0 md:mr-6 mb-4 md:mb-0"
                                src="https://i.pravatar.cc/150"
                                alt="User Avatar"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-text-primary">{userProfile.fullName}</h3>
                                <p className="text-text-secondary">{userProfile.email}</p>
                            </div>
                            <button className="mt-4 md:mt-0 bg-brand-secondary/10 text-brand-secondary font-bold py-2 px-4 rounded-lg hover:bg-brand-secondary/20 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </Card>
                </div>
                
                <Card title="Personal Information">
                    <div className="space-y-4">
                        <ProfileDetail label="Date of Birth" value={userProfile.dob} icon="user" />
                        <ProfileDetail label="Age" value={`${age} years old`} icon="user" />
                        <ProfileDetail label="Gender" value={userProfile.gender} icon="user" />
                        <ProfileDetail label="Blood Type" value={userProfile.bloodType} icon="vitals" />
                    </div>
                </Card>

                <Card title="Health Metrics">
                     <div className="space-y-4">
                        <ProfileDetail label="Height" value={`${userProfile.height} cm`} icon="run" />
                        <ProfileDetail label="Weight" value={`${userProfile.weight} kg`} icon="scale" />
                        <div>
                            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                                <Icon name="vitals" className="w-6 h-6 text-brand-secondary mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-text-secondary">Body Mass Index (BMI)</p>
                                    <p className="text-md font-semibold text-text-primary">{bmi} ({bmiCategory})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Lifestyle Factors">
                    <div className="space-y-4">
                        <ProfileDetail label="Smoking Status" value={userProfile.lifestyle.smoker} icon="leaf" />
                        <ProfileDetail label="Alcohol Consumption" value={userProfile.lifestyle.alcohol} icon="leaf" />
                        <ProfileDetail label="Exercise Frequency" value={userProfile.lifestyle.exerciseFrequency} icon="exercise" />
                    </div>
                </Card>

                <Card title="Medical History" className="lg:col-span-1">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-text-primary mb-2">Known Conditions</h4>
                            {userProfile.medicalConditions.map(c => <InfoListItem key={c} icon="vitals" text={c} />)}
                        </div>
                         <div>
                            <h4 className="font-semibold text-text-primary mb-2">Allergies</h4>
                             {userProfile.allergies.map(a => <InfoListItem key={a} icon="ban" text={a} />)}
                        </div>
                    </div>
                </Card>
                
                 <Card title="Current Medications" className="lg:col-span-1">
                     <div className="space-y-2">
                         {userProfile.medications.map(med => (
                             <InfoListItem key={med.name} icon="pill" text={<>{med.name} <span className="text-gray-500">- {med.dosage}</span></>} />
                         ))}
                    </div>
                </Card>
                
                 <Card title="Emergency Contact" className="lg:col-span-1">
                     <div className="space-y-3">
                         <ProfileDetail label="Name" value={userProfile.emergencyContact.name} icon="user" />
                         <ProfileDetail label="Relationship" value={userProfile.emergencyContact.relationship} icon="profile" />
                         <ProfileDetail label="Phone" value={userProfile.emergencyContact.phone} icon="phone" />
                    </div>
                </Card>
                
                <Card title="Connected Devices" className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {connectedDevices.map(device => (
                            <div key={device.id} className={`p-4 border rounded-lg flex items-center ${device.connected ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                                <Icon name={device.icon} className={`w-6 h-6 mr-4 ${device.connected ? 'text-green-600' : 'text-gray-500'}`} />
                                <span className="font-medium text-text-primary">{device.name}</span>
                                <div className={`ml-auto w-3 h-3 rounded-full ${device.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;

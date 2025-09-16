import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ProfileSetup from './ProfileSetup';
import DevicePairing from './DevicePairing';
import PinSetup from './PinSetup';
import OnboardingProgress from './OnboardingProgress';
import Icon from './shared/Icon';

type AuthView = 'login' | 'signup';
type OnboardingStep = 'profile' | 'devices' | 'pin' | null;

interface AuthProps {
    onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [authView, setAuthView] = useState<AuthView>('login');
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(null);

    const handleSignUpSuccess = () => {
        setOnboardingStep('profile');
    };

    const renderOnboarding = () => {
        switch (onboardingStep) {
            case 'profile':
                return <ProfileSetup onProfileComplete={() => setOnboardingStep('devices')} />;
            case 'devices':
                return <DevicePairing onPairingComplete={() => setOnboardingStep('pin')} />;
            case 'pin':
                return <PinSetup onSetupComplete={onLoginSuccess} />;
            default:
                return null;
        }
    };

    const renderAuth = () => {
        if (authView === 'login') {
            return <Login onNavigateToSignUp={() => setAuthView('signup')} onLoginSuccess={onLoginSuccess} />;
        }
        return <SignUp onNavigateToLogin={() => setAuthView('login')} onSignUpSuccess={handleSignUpSuccess} />;
    };
    
    const getOnboardingSteps = () => {
        return [
            { id: 'profile', label: 'Profile' },
            { id: 'devices', label: 'Devices' },
            { id: 'pin', label: 'Security' },
        ];
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-background p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center items-center mb-6">
                    <div className="bg-brand-primary p-3 rounded-xl mr-4">
                        <Icon name="health-bot" className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary">MyCenna Ai</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {onboardingStep ? (
                        <>
                            <OnboardingProgress steps={getOnboardingSteps()} currentStep={onboardingStep} />
                            <div className="mt-8">
                                {renderOnboarding()}
                            </div>
                        </>
                    ) : (
                        renderAuth()
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
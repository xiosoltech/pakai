import React from 'react';

interface OnboardingProgressProps {
    steps: { id: string; label: string }[];
    currentStep: string;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ steps, currentStep }) => {
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <div>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStepIndex ? 'bg-brand-secondary' : 'bg-gray-200'}`}>
                                {index < currentStepIndex ? (
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={`${index <= currentStepIndex ? 'text-white' : 'text-gray-500'} font-bold`}>{index + 1}</span>
                                )}
                            </div>
                            <p className={`mt-2 text-xs font-medium ${index <= currentStepIndex ? 'text-brand-secondary' : 'text-gray-500'}`}>{step.label}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 ${index < currentStepIndex ? 'bg-brand-secondary' : 'bg-gray-200'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default OnboardingProgress;

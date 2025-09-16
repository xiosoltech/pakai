import React, { useState, useEffect, useMemo } from 'react';
import Card from './shared/Card';

const BreathingExercise: React.FC = () => {
    const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
    const [countdown, setCountdown] = useState(0);

    const phaseConfig = useMemo(() => ({
        inhale: { duration: 4, next: 'hold', text: 'Breathe In...' },
        hold: { duration: 7, next: 'exhale', text: 'Hold...' },
        exhale: { duration: 8, next: 'inhale', text: 'Breathe Out...' },
    }), []);

    useEffect(() => {
        if (phase === 'idle') return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                // Transition to next phase
                const nextPhase = phaseConfig[phase as keyof typeof phaseConfig].next as 'inhale' | 'hold' | 'exhale';
                setPhase(nextPhase);
                return phaseConfig[nextPhase].duration;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phase, phaseConfig]);

    const startExercise = () => {
        setPhase('inhale');
        setCountdown(phaseConfig.inhale.duration);
    };

    const stopExercise = () => {
        setPhase('idle');
        setCountdown(0);
    };

    const getAnimationClass = () => {
        switch (phase) {
            case 'inhale': return 'scale-125';
            case 'hold': return 'scale-125';
            case 'exhale': return 'scale-100';
            default: return 'scale-100';
        }
    };

    const phaseText = phase !== 'idle' ? phaseConfig[phase].text : 'Ready to begin?';

    return (
        <Card title="4-7-8 Breathing Exercise">
            <div className="flex flex-col items-center justify-center p-8">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className={`absolute w-full h-full bg-brand-secondary/20 rounded-full transition-transform duration-1000 ${getAnimationClass()}`}></div>
                    <div className={`absolute w-3/4 h-3/4 bg-brand-secondary/40 rounded-full transition-transform duration-1000 delay-100 ${getAnimationClass()}`}></div>
                    <div className="z-10 text-center">
                        <p className="text-2xl font-semibold text-text-primary">{phaseText}</p>
                        {phase !== 'idle' && <p className="text-5xl font-bold text-brand-secondary mt-2">{countdown}</p>}
                    </div>
                </div>
                <div className="mt-8">
                    {phase === 'idle' ? (
                        <button onClick={startExercise} className="bg-brand-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary transition-colors">
                            Start
                        </button>
                    ) : (
                        <button onClick={stopExercise} className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                            Stop
                        </button>
                    )}
                </div>
                <p className="text-sm text-text-secondary mt-6 text-center max-w-md">
                    The 4-7-8 breathing technique is a simple and effective way to reduce stress and anxiety. Inhale for 4 seconds, hold for 7, and exhale for 8.
                </p>
            </div>
        </Card>
    );
};

export default BreathingExercise;

import React, { useState } from 'react';
import type { Exercise } from '../types';
import BreathingExercise from './BreathingExercise';
import CardioManual from './CardioManual';
import ExerciseHistory from './ExerciseHistory';

type ExerciseView = 'breathing' | 'cardio' | 'history';

const ExerciseHub: React.FC = () => {
    const [activeView, setActiveView] = useState<ExerciseView>('breathing');
    const [history, setHistory] = useState<Exercise[]>([]);

    const handleSaveExercise = (exercise: Exercise) => {
        setHistory(prev => [exercise, ...prev]);
        setActiveView('history');
    };

    const tabs: { id: ExerciseView; label: string }[] = [
        { id: 'breathing', label: 'Breathing' },
        { id: 'cardio', label: 'Log Cardio' },
        { id: 'history', label: 'History' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Exercise Hub</h2>

            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id)}
                            className={`${
                                activeView === tab.id
                                    ? 'border-brand-secondary text-brand-primary'
                                    : 'border-transparent text-text-secondary hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div>
                {activeView === 'breathing' && <BreathingExercise />}
                {activeView === 'cardio' && <CardioManual onSave={handleSaveExercise} />}
                {activeView === 'history' && <ExerciseHistory history={history} />}
            </div>
        </div>
    );
};

export default ExerciseHub;

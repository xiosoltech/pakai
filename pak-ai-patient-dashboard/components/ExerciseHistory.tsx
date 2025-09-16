import React from 'react';
import type { Exercise } from '../types';
import Card from './shared/Card';
import Icon from './shared/Icon';

interface ExerciseHistoryProps {
    history: Exercise[];
}

const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({ history }) => {
    return (
        <Card title="Workout History">
            {history.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                    <p>No workouts logged yet. Get started!</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {history.slice().reverse().map(exercise => (
                        <li key={exercise.id} className="py-4 flex items-center">
                            <div className="mr-4">
                                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-primary/20">
                                    <Icon name={exercise.type === 'Cardio' ? 'run' : 'breath'} className="h-6 w-6 text-brand-primary" />
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-text-primary">{exercise.details}</p>
                                <p className="text-sm text-text-secondary">{exercise.duration}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                {exercise.date}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
};

export default ExerciseHistory;

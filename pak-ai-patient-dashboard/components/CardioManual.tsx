import React, { useState } from 'react';
import Card from './shared/Card';
import Icon from './shared/Icon';
import { Exercise } from '../types';

const CardioManual: React.FC<{ onSave: (exercise: Exercise) => void }> = ({ onSave }) => {
    const [activity, setActivity] = useState('Running');
    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!duration) return;

        const newExercise: Exercise = {
            id: new Date().toISOString(),
            type: 'Cardio',
            date: new Date().toLocaleDateString(),
            duration: `${duration} minutes`,
            details: `${activity}${distance ? ` - ${distance} miles` : ''}`,
        };
        onSave(newExercise);
        // Reset form
        setActivity('Running');
        setDuration('');
        setDistance('');
        setNotes('');
    };

    return (
        <Card title="Log Cardio Workout">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="activity" className="block text-sm font-medium text-text-secondary">Activity</label>
                    <select
                        id="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                    >
                        <option>Running</option>
                        <option>Cycling</option>
                        <option>Swimming</option>
                        <option>Walking</option>
                        <option>Elliptical</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-text-secondary">Duration (minutes)</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="distance" className="block text-sm font-medium text-text-secondary">Distance (miles)</label>
                        <input
                            type="number"
                            id="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-text-secondary">Notes (optional)</label>
                    <textarea
                        id="notes"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-400"
                        disabled={!duration}
                    >
                        <Icon name="plusCircle" className="w-5 h-5 mr-2" />
                        Log Workout
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default CardioManual;
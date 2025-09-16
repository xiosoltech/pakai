import React from 'react';
import type { HealthAlert } from '../types';
import Card from './shared/Card';

const mockAlerts: HealthAlert[] = [
    { id: 1, severity: 'High', message: 'Unusually high heart rate detected during rest. Please rest and monitor. If it persists, contact your doctor.', timestamp: '10 minutes ago' },
    { id: 2, severity: 'Medium', message: 'Blood pressure is trending higher than your baseline this week. Recommend checking it again in a calm state.', timestamp: '2 hours ago' },
    { id: 3, severity: 'Low', message: 'Reminder: Scheduled medication due in 1 hour.', timestamp: '4 hours ago' },
    { id: 4, severity: 'Low', message: 'You met your sleep goal last night. Great job!', timestamp: '8 hours ago' },
    { id: 5, severity: 'Medium', message: 'Air quality in your area is poor. Consider limiting outdoor activity today.', timestamp: '1 day ago' },
];

const getSeverityStyles = (severity: 'High' | 'Medium' | 'Low') => {
    switch (severity) {
        case 'High': return 'border-l-4 border-alert-high bg-red-50 hover:bg-red-100';
        case 'Medium': return 'border-l-4 border-alert-medium bg-orange-50 hover:bg-orange-100';
        case 'Low': return 'border-l-4 border-alert-low bg-green-50 hover:bg-green-100';
    }
};

const HealthAlerts: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Proactive Health Alerts</h2>
            <Card>
                <div className="space-y-4">
                    {mockAlerts.length > 0 ? (
                        mockAlerts.map(alert => (
                            <div key={alert.id} className={`p-4 rounded-lg flex items-start gap-4 ${getSeverityStyles(alert.severity)} transition-colors duration-200 ease-in-out`}>
                                <div className="flex-shrink-0 pt-1">
                                    <svg className={`w-6 h-6 ${alert.severity === 'High' ? 'text-alert-high' : alert.severity === 'Medium' ? 'text-alert-medium' : 'text-alert-low'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-md font-bold text-text-primary">{alert.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-text-secondary py-8">No new alerts.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default HealthAlerts;
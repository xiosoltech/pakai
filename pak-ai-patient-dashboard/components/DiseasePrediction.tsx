import React, { useState } from 'react';
import { predictDiseaseRisks } from '../services/geminiService';
import type { DiseasePrediction } from '../types';
import Card from './shared/Card';
import Icon from './shared/Icon';

const getRiskStyles = (riskLevel: 'High' | 'Medium' | 'Low') => {
    switch (riskLevel) {
        case 'High': return { badge: 'bg-red-100 text-red-800', border: 'border-red-500' };
        case 'Medium': return { badge: 'bg-orange-100 text-orange-800', border: 'border-orange-500' };
        case 'Low': return { badge: 'bg-green-100 text-green-800', border: 'border-green-500' };
        default: return { badge: 'bg-gray-100 text-gray-800', border: 'border-gray-500' };
    }
};

const DiseasePredictionComponent: React.FC = () => {
    const [predictions, setPredictions] = useState<DiseasePrediction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisPerformed, setAnalysisPerformed] = useState(false);

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysisPerformed(true);

        // In a real app, this data would come from a patient data store.
        const mockHealthData = {
            age: 45,
            sex: 'Male',
            bmi: 28.5,
            avgHeartRate: 78,
            avgBloodPressure: '135/85 mmHg',
            cholesterol: '220 mg/dL',
            glucose: '115 mg/dL',
            smoker: 'No',
            familyHistory: ['Hypertension', 'Diabetes'],
        };

        try {
            const result = await predictDiseaseRisks(mockHealthData);
            setPredictions(result);
        } catch (err) {
            console.error('Disease prediction failed:', err);
            setError('Failed to fetch disease predictions. The AI model may be temporarily unavailable.');
            setPredictions([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Disease Risk Prediction">
            {!analysisPerformed ? (
                <div className="text-center py-8">
                    <p className="text-text-secondary mb-4">
                        Use our AI model to analyze your health data and identify potential long-term risks.
                    </p>
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto hover:bg-brand-primary disabled:bg-gray-400 transition-colors"
                    >
                         <Icon name="analyze" className="w-5 h-5 mr-2" />
                         Analyze My Health Risks
                    </button>
                </div>
            ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-48">
                    <svg className="animate-spin h-8 w-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-text-secondary">Analyzing health data... please wait.</p>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                    <button onClick={handleAnalyze} className="mt-4 bg-brand-accent text-white font-bold py-2 px-4 rounded-lg">
                        Retry
                    </button>
                </div>
            ) : (
                <div>
                     <div className="space-y-4">
                        {predictions.map((pred) => {
                            const styles = getRiskStyles(pred.riskLevel);
                            return (
                                <div key={pred.diseaseName} className={`p-4 rounded-lg border-l-4 ${styles.border} bg-white shadow-sm`}>
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-semibold text-text-primary">{pred.diseaseName}</h4>
                                        <span className={`px-2.5 py-0.5 text-sm font-medium rounded-full ${styles.badge}`}>{pred.riskLevel} Risk</span>
                                    </div>
                                    <p className="text-sm text-text-secondary mt-2">{pred.explanation}</p>
                                    <div className="mt-3">
                                        <h5 className="text-sm font-semibold text-text-primary">Recommendations:</h5>
                                        <ul className="list-disc list-inside text-sm text-text-secondary mt-1 space-y-1">
                                            {pred.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                     <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                        <strong>Disclaimer:</strong> This is an AI-generated prediction based on limited data and is not a medical diagnosis. Consult with a qualified healthcare professional for any health concerns.
                    </div>
                </div>
            )}
        </Card>
    );
};

export default DiseasePredictionComponent;

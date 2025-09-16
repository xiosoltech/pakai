import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { analyzeLabReport } from '../services/geminiService';
import type { LabReportAnalysis } from '../types';
import Card from './shared/Card';
import Icon from './shared/Icon';

const LabReportUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [mimeType, setMimeType] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<LabReportAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = (reader.result as string).split(',')[1];
                resolve(result);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setAnalysis(null);
        setError(null);
        try {
            const b64 = await fileToBase64(file);
            setBase64Image(b64);
            setMimeType(file.type);
        } catch (err) {
            setError('Failed to read the file.');
            console.error(err);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
        multiple: false
    });

    const handleAnalyze = async () => {
        if (!base64Image || !mimeType) {
            setError('No image selected or image format is incorrect.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const response = await analyzeLabReport(base64Image, mimeType);
            const jsonText = response.text.trim();
            if (jsonText) {
                const parsedResult = JSON.parse(jsonText);
                setAnalysis(parsedResult);
            } else {
                setError('AI model returned an empty analysis. Please try again.');
            }
        } catch (err) {
            console.error('Lab report analysis failed:', err);
            setError('Failed to analyze the lab report. The AI model may be temporarily unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Lab Report Analyzer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Upload Report">
                    <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300 hover:border-brand-accent'}`}>
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center">
                            <Icon name="upload" className="w-12 h-12 text-gray-400 mb-4" />
                            {selectedFile ? (
                                <div>
                                    <p className="font-semibold text-text-primary">{selectedFile.name}</p>
                                    <p className="text-sm text-text-secondary">{Math.round(selectedFile.size / 1024)} KB</p>
                                </div>
                            ) : (
                                <p className="text-text-secondary">Drag 'n' drop a lab report image here, or click to select a file.</p>
                            )}
                        </div>
                    </div>
                    {base64Image && (
                         <div className="mt-4">
                            <h4 className="font-semibold text-text-primary mb-2">Image Preview:</h4>
                            <img src={`data:${mimeType};base64,${base64Image}`} alt="Lab report preview" className="rounded-lg max-h-60 w-full object-contain border" />
                        </div>
                    )}
                    <button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || isLoading}
                        className="mt-6 w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-brand-primary disabled:bg-gray-400 transition-colors"
                    >
                        <Icon name="analyze" className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Analyze Report'}
                    </button>
                </Card>

                <Card title="Analysis Results">
                    {isLoading && (
                         <div className="flex flex-col items-center justify-center h-full">
                            <svg className="animate-spin h-8 w-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-text-secondary">AI is analyzing your report...</p>
                        </div>
                    )}
                     {error && (
                        <div className="text-center py-8 text-red-500">
                            <p>{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && !analysis && (
                        <div className="text-center py-8 text-text-secondary">
                            <p>Analysis results will be displayed here.</p>
                        </div>
                    )}
                    {analysis && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center"><Icon name="clipboardCheck" className="mr-2 w-5 h-5 text-brand-primary"/>Overall Summary</h4>
                                <p className="text-text-secondary">{analysis.summary}</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center"><Icon name="reports" className="mr-2 w-5 h-5 text-brand-primary"/>Key Findings</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Parameter</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Value</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Assessment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {analysis.keyFindings.map((finding, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-text-primary">{finding.parameter}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-text-secondary">{finding.value}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-text-secondary">{finding.assessment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                             <div>
                                <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center"><Icon name="lightbulb" className="mr-2 w-5 h-5 text-brand-primary"/>Potential Symptoms & Next Steps</h4>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div className="bg-gray-50 p-3 rounded-lg">
                                        <h5 className="font-semibold text-text-primary mb-1">Predicted Symptoms</h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                                            {analysis.predictedSymptoms.map((symptom, i) => <li key={i}>{symptom}</li>)}
                                        </ul>
                                     </div>
                                      <div className="bg-gray-50 p-3 rounded-lg">
                                        <h5 className="font-semibold text-text-primary mb-1">Suggested Next Steps</h5>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
                                            {analysis.suggestedNextSteps.map((step, i) => <li key={i}>{step}</li>)}
                                        </ul>
                                     </div>
                                 </div>
                            </div>
                             <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                                <strong>Disclaimer:</strong> This is an AI-generated analysis and is for informational purposes only. It is not a substitute for professional medical advice.
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default LabReportUploader;

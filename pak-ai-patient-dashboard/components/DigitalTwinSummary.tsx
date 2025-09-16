import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, LineChart, Line } from 'recharts';
import Card from './shared/Card';
import DiseasePrediction from './DiseasePrediction';
import type { VitalDataPoint } from '../types';

const riskData = [{ name: 'Risk Score', value: 68, fill: '#FFA726' }];

const healthMetrics = [
    { title: 'Overall Health Score', value: '85/100', trend: '+2%', trendDirection: 'up' },
    { title: 'Cardiovascular Risk', value: 'Low', trend: 'Stable', trendDirection: 'stable' },
];

const DigitalTwinSummary: React.FC = () => {
    const [heartRateData, setHeartRateData] = useState<VitalDataPoint[]>([]);

    useEffect(() => {
        const generateInitialData = (): VitalDataPoint[] => {
            const data: VitalDataPoint[] = [];
            const now = new Date();
            for (let i = 5; i >= 0; i--) {
                const time = new Date(now.getTime() - i * 5000);
                data.push({
                    time: time.toISOString(),
                    heartRate: Math.floor(Math.random() * 10) + 68,
                    bpSystolic: 0, bpDiastolic: 0, oxygen: 0,
                });
            }
            return data;
        };
        setHeartRateData(generateInitialData());

        const interval = setInterval(() => {
            setHeartRateData(currentData => {
                const now = new Date();
                const newDataPoint: VitalDataPoint = {
                    time: now.toISOString(),
                    heartRate: Math.floor(Math.random() * 10) + 68, // 68-78 bpm
                    bpSystolic: 0, bpDiastolic: 0, oxygen: 0,
                };
                return [...currentData.slice(1), newDataPoint];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const latestHeartRate = heartRateData.length > 0 ? heartRateData[heartRateData.length - 1].heartRate : 72;

    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Digital Twin Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                    <Card key={index}>
                        <h4 className="text-md font-medium text-text-secondary">{metric.title}</h4>
                        <p className="text-3xl font-bold text-text-primary mt-2">{metric.value}</p>
                        <div className="flex items-center mt-2 text-sm">
                            <span className={`${metric.trendDirection === 'up' ? 'text-green-500' : metric.trendDirection === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                                {metric.trend}
                            </span>
                            <span className="text-text-secondary ml-1">vs last week</span>
                        </div>
                    </Card>
                ))}
                <Card>
                    <h4 className="text-md font-medium text-text-secondary">Live Heart Rate</h4>
                    <p className="text-3xl font-bold text-red-500 mt-2">{latestHeartRate} <span className="text-lg">bpm</span></p>
                    <div className="w-full h-12 mt-2">
                        <ResponsiveContainer>
                            <LineChart data={heartRateData}>
                                <Line type="monotone" dataKey="heartRate" stroke="#EF5350" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                 <Card>
                    <h4 className="text-md font-medium text-text-secondary">Sleep Analysis</h4>
                    <p className="text-3xl font-bold text-text-primary mt-2">7h 45m</p>
                    <div className="mt-3">
                        <div className="flex justify-between text-sm text-text-secondary mb-1">
                            <span>Quality</span>
                            <span>88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <Card className="lg:col-span-1" title="Proactive Risk Score">
                     <div className="w-full h-64">
                        <ResponsiveContainer>
                             <RadialBarChart
                                innerRadius="70%"
                                outerRadius="100%"
                                data={riskData}
                                startAngle={180}
                                endAngle={0}
                                barSize={20}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar background dataKey="value" cornerRadius={10} />
                                <text
                                    x="50%"
                                    y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-4xl font-bold fill-current text-text-primary"
                                >
                                    {riskData[0].value}
                                </text>
                                <text
                                    x="50%"
                                    y="70%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-lg fill-current text-text-secondary"
                                >
                                    Moderate
                                </text>
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                 <Card className="lg:col-span-2" title="AI-Generated Health Insights">
                    <div className="space-y-4 text-text-secondary">
                        <p>Based on your recent vitals and lab reports, your overall health is trending positively. Your cardiovascular system appears strong, but we recommend monitoring your sodium intake to maintain optimal blood pressure levels.</p>
                        <p>Your sleep patterns have improved, which correlates with better metabolic health markers. Continue your current evening routine.</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                           <li><span className="font-semibold text-text-primary">Recommendation:</span> Incorporate 20 minutes of light cardio 3-4 times a week.</li>
                            <li><span className="font-semibold text-text-primary">Watchlist:</span> Glucose levels are in the upper normal range. Consider reducing sugary drinks.</li>
                        </ul>
                    </div>
                </Card>
            </div>
             <div className="mt-6">
                <DiseasePrediction />
            </div>
        </div>
    );
};

export default DigitalTwinSummary;

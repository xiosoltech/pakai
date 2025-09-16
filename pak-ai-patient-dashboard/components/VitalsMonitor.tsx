
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { VitalDataPoint } from '../types';
import Card from './shared/Card';

const generateInitialData = (): VitalDataPoint[] => {
    const data: VitalDataPoint[] = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5000);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            heartRate: Math.floor(Math.random() * 20) + 65, // 65-85 bpm
            bpSystolic: Math.floor(Math.random() * 10) + 115, // 115-125 mmHg
            bpDiastolic: Math.floor(Math.random() * 10) + 75, // 75-85 mmHg
            oxygen: Math.floor(Math.random() * 2) + 97, // 97-99%
        });
    }
    return data;
};

const VitalsMonitor: React.FC = () => {
    const [data, setData] = useState<VitalDataPoint[]>(generateInitialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(currentData => {
                const now = new Date();
                const newDataPoint: VitalDataPoint = {
                    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    heartRate: Math.floor(Math.random() * 20) + 65,
                    bpSystolic: Math.floor(Math.random() * 10) + 115,
                    bpDiastolic: Math.floor(Math.random() * 10) + 75,
                    oxygen: Math.floor(Math.random() * 2) + 97,
                };
                return [...currentData.slice(1), newDataPoint];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const latestVitals = data[data.length - 1];

    const vitalCards = [
        { title: 'Heart Rate', value: `${latestVitals.heartRate} bpm`, color: 'text-red-500' },
        { title: 'Blood Pressure', value: `${latestVitals.bpSystolic}/${latestVitals.bpDiastolic} mmHg`, color: 'text-blue-500' },
        { title: 'Oxygen Saturation', value: `${latestVitals.oxygen}%`, color: 'text-green-500' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Real-Time Vitals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {vitalCards.map((vital, index) => (
                    <Card key={index}>
                        <h4 className="text-md font-medium text-text-secondary">{vital.title}</h4>
                        <p className={`text-4xl font-bold mt-2 ${vital.color}`}>{vital.value}</p>
                    </Card>
                ))}
            </div>
            <Card title="Vitals Trend">
                <div className="w-full h-96">
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="time" tick={{ fill: '#4A5568' }} />
                            <YAxis yAxisId="left" tick={{ fill: '#4A5568' }} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#4A5568' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(5px)',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate (bpm)" stroke="#EF5350" strokeWidth={2} dot={false} />
                            <Line yAxisId="left" type="monotone" dataKey="bpSystolic" name="Systolic (mmHg)" stroke="#42A5F5" strokeWidth={2} dot={false} />
                            <Line yAxisId="left" type="monotone" dataKey="bpDiastolic" name="Diastolic (mmHg)" stroke="#1976D2" strokeWidth={2} dot={false} />
                            <Line yAxisId="right" type="monotone" dataKey="oxygen" name="Oxygen (%)" stroke="#66BB6A" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default VitalsMonitor;

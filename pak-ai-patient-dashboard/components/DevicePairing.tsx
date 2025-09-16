import React, { useState } from 'react';
import type { HealthDevice } from '../types';
import Icon from './shared/Icon';

const AVAILABLE_DEVICES: HealthDevice[] = [
    { id: 'watch', name: 'Smart Watch', icon: 'watch', connected: false },
    { id: 'scale', name: 'Smart Scale', icon: 'scale', connected: false },
    { id: 'cuff', name: 'BP Cuff', icon: 'cuff', connected: false },
];

const DevicePairing: React.FC<{ onPairingComplete: () => void }> = ({ onPairingComplete }) => {
    const [devices, setDevices] = useState<HealthDevice[]>(AVAILABLE_DEVICES);

    const toggleDeviceConnection = (deviceId: string) => {
        setDevices(devices.map(d => d.id === deviceId ? { ...d, connected: !d.connected } : d));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Pair Your Devices</h2>
            <p className="text-center text-text-secondary mb-6">Connect your health devices to sync data automatically.</p>

            <div className="space-y-3">
                {devices.map(device => (
                    <button
                        key={device.id}
                        onClick={() => toggleDeviceConnection(device.id)}
                        className={`w-full p-4 border rounded-lg flex items-center transition-all ${device.connected ? 'border-brand-secondary bg-brand-light/20' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                        <Icon name={device.icon} className={`w-6 h-6 mr-4 ${device.connected ? 'text-brand-secondary' : 'text-gray-500'}`} />
                        <span className={`font-medium ${device.connected ? 'text-text-primary' : 'text-text-secondary'}`}>{device.name}</span>
                        <div className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center ${device.connected ? 'bg-brand-secondary' : 'bg-gray-200'}`}>
                            {device.connected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={onPairingComplete}
                className="w-full mt-8 bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors flex items-center justify-center"
            >
                Finish Setup <Icon name="arrowRight" className="w-5 h-5 ml-2" />
            </button>
        </div>
    );
};

export default DevicePairing;
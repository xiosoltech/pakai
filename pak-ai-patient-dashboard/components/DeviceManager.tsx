import React, { useState } from 'react';
import type { HealthDevice } from '../types';
import Icon from './shared/Icon';

const ALL_DEVICES: HealthDevice[] = [
    { id: 'watch', name: 'Smart Watch', icon: 'watch', connected: false },
    { id: 'scale', name: 'Smart Scale', icon: 'scale', connected: false },
    { id: 'cuff', name: 'BP Cuff', icon: 'cuff', connected: false },
];

const DeviceManager: React.FC = () => {
    const [devices, setDevices] = useState<HealthDevice[]>(ALL_DEVICES);

    const connectNextDevice = () => {
        setDevices(currentDevices => {
            const firstUnconnectedIndex = currentDevices.findIndex(d => !d.connected);
            if (firstUnconnectedIndex === -1) return currentDevices; // All devices connected

            const newDevices = [...currentDevices];
            newDevices[firstUnconnectedIndex].connected = true;
            return newDevices;
        });
    };

    const connectedDevices = devices.filter(d => d.connected);
    const canConnectMore = devices.some(d => !d.connected);

    return (
        <div className="bg-brand-secondary/30 p-3 rounded-lg">
            <h3 className="font-semibold text-white text-sm mb-2">Connected Devices</h3>
            <div className="space-y-2">
                {connectedDevices.length > 0 ? (
                    connectedDevices.map(device => (
                        <div key={device.id} className="flex items-center text-white text-sm">
                            <Icon name={device.icon} className="w-5 h-5 mr-2 opacity-80" />
                            <span>{device.name}</span>
                            <div className="ml-auto w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-gray-300">No devices connected.</p>
                )}
            </div>
            {canConnectMore && (
                <button
                    onClick={connectNextDevice}
                    className="w-full mt-3 flex items-center justify-center text-sm text-white bg-white/20 hover:bg-white/30 rounded-md py-1.5 transition-colors"
                >
                    <Icon name="plusCircle" className="w-4 h-4 mr-2" />
                    Connect New Device
                </button>
            )}
        </div>
    );
};

export default DeviceManager;

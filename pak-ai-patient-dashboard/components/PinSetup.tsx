import React, { useState } from 'react';
import Icon from './shared/Icon';

const PinSetup: React.FC<{ onSetupComplete: () => void }> = ({ onSetupComplete }) => {
    const [biometricsEnabled, setBiometricsEnabled] = useState(false);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Secure Your Account</h2>
            <p className="text-center text-text-secondary mb-6">Add a PIN for quick and secure access.</p>

            <form onSubmit={(e) => { e.preventDefault(); onSetupComplete(); }}>
                <div className="flex justify-center space-x-2 mb-6">
                    <input type="password" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400" />
                    <input type="password" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400" />
                    <input type="password" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400" />
                    <input type="password" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400" />
                </div>

                <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg mb-6">
                    <Icon name="biometric" className="w-8 h-8 text-brand-secondary mr-4" />
                    <div>
                         <h3 className="font-semibold text-text-primary">Enable Biometric Login</h3>
                         <p className="text-sm text-text-secondary">Use your fingerprint or face to sign in.</p>
                    </div>
                     <button
                        type="button"
                        onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                        className={`ml-auto w-12 h-6 rounded-full relative transition-colors ${biometricsEnabled ? 'bg-brand-secondary' : 'bg-gray-200'}`}
                        aria-label="Toggle Biometric Login"
                    >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${biometricsEnabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
                    </button>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors"
                >
                    Complete Registration
                </button>
                 <button
                    onClick={onSetupComplete}
                    className="w-full mt-3 text-sm text-text-secondary hover:underline"
                >
                    Skip for now
                </button>
            </form>
        </div>
    );
};

export default PinSetup;
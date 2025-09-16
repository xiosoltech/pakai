import React, { useState, useEffect } from 'react';
import type { View } from './types';
import Sidebar from './components/Sidebar';
import DigitalTwinSummary from './components/DigitalTwinSummary';
import VitalsMonitor from './components/VitalsMonitor';
import HealthBot from './components/HealthBot';
import LabReportUploader from './components/LabReportUploader';
import HealthAlerts from './components/HealthAlerts';
import ExerciseHub from './components/ExerciseHub';
import Auth from './components/Auth';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check for session persistence
        const userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
        if (userIsLoggedIn === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem('userIsLoggedIn', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userIsLoggedIn');
        setIsAuthenticated(false);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DigitalTwinSummary />;
            case 'profile':
                return <ProfilePage />;
            case 'vitals':
                return <VitalsMonitor />;
            case 'health-bot':
                return <HealthBot />;
            case 'lab-reports':
                return <LabReportUploader />;
            case 'alerts':
                return <HealthAlerts />;
            case 'exercise':
                return <ExerciseHub />;
            default:
                return <DigitalTwinSummary />;
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen bg-brand-background">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Auth onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="flex h-screen bg-brand-background">
            <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />
            <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
import type { View, IconName } from './types';

interface NavigationItem {
    id: View;
    label: string;
    icon: IconName;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'profile', label: 'My Profile', icon: 'profile' },
    { id: 'vitals', label: 'Vitals Monitor', icon: 'vitals' },
    { id: 'health-bot', label: 'HealthBot', icon: 'health-bot' },
    { id: 'lab-reports', label: 'Lab Reports', icon: 'lab-reports' },
    { id: 'alerts', label: 'Health Alerts', icon: 'alerts' },
    { id: 'exercise', label: 'Exercise Hub', icon: 'exercise' },
];
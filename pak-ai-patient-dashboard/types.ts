export type View = 'dashboard' | 'vitals' | 'health-bot' | 'lab-reports' | 'alerts' | 'exercise' | 'profile';

export type IconName =
    | 'dashboard'
    | 'vitals'
    | 'health-bot'
    | 'lab-reports'
    | 'alerts'
    | 'exercise'
    | 'logout'
    | 'upload'
    | 'analyze'
    | 'clipboardCheck'
    | 'reports'
    | 'lightbulb'
    | 'plusCircle'
    | 'run'
    | 'breath'
    | 'watch'
    | 'scale'
    | 'cuff'
    | 'email'
    | 'lock'
    | 'google'
    | 'facebook'
    | 'biometric'
    | 'user'
    | 'profile'
    | 'arrowRight'
    | 'send'
    | 'microphone'
    | 'volumeUp'
    | 'volumeOff'
    | 'pill'
    | 'leaf'
    | 'ban'
    | 'phone';

export interface VitalDataPoint {
    time: string;
    heartRate: number;
    bpSystolic: number;
    bpDiastolic: number;
    oxygen: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface LabReportAnalysis {
    summary: string;
    keyFindings: {
        parameter: string;
        value: string;
        assessment: string;
    }[];
    predictedSymptoms: string[];
    suggestedNextSteps: string[];
}

export interface HealthAlert {
    id: number;
    severity: 'High' | 'Medium' | 'Low';
    message: string;
    timestamp: string;
}

export interface DiseasePrediction {
    diseaseName: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    explanation: string;
    recommendations: string[];
}

export interface HealthDevice {
    id: string;
    name: string;
    icon: IconName;
    connected: boolean;
}

export interface Exercise {
    id: string;
    type: 'Cardio' | 'Breathing';
    date: string;
    duration: string;
    details: string;
}

// Expanded User Profile Types
export interface Medication {
    name: string;
    dosage: string;
}

export interface UserProfile {
    fullName: string;
    email: string;
    dob: string;
    gender: string;
    height: number; // cm
    weight: number; // kg
    bloodType: string;
    medicalConditions: string[];
    allergies: string[];
    medications: Medication[];
    lifestyle: {
        smoker: 'Never' | 'Former' | 'Current';
        alcohol: 'None' | 'Socially' | 'Regularly';
        exerciseFrequency: string; // e.g., '3-4 times a week'
    };
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
}

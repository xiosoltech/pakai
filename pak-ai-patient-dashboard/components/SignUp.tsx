import React, { useState } from 'react';
import Icon from './shared/Icon';

interface SignUpProps {
    onNavigateToLogin: () => void;
    onSignUpSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigateToLogin, onSignUpSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Here you would typically handle user registration
        console.log('Signing up with:', { name, email, password });
        onSignUpSuccess();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Create Your Account</h2>
            <p className="text-center text-text-secondary mb-6">Start your journey to better health today.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="user" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="Alex Doe"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email-signup" className="block text-sm font-medium text-text-secondary">Email Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="email" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email-signup"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password-signup" className="block text-sm font-medium text-text-secondary">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="lock" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            id="password-signup"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="Minimum 8 characters"
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-text-secondary">Confirm Password</label>
                     <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="lock" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="Re-enter your password"
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent">
                        Create Account
                    </button>
                </div>
            </form>
            <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={onNavigateToLogin} className="font-medium text-brand-secondary hover:text-brand-primary">
                    Log in
                </button>
            </p>
        </div>
    );
};

export default SignUp;

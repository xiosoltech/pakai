import React, { useState } from 'react';
import Icon from './shared/Icon';

interface LoginProps {
    onNavigateToSignUp: () => void;
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateToSignUp, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (email === 'info@mycenna.ai' && password === '112233') {
            console.log('Login successful for:', { email });
            onLoginSuccess();
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Welcome Back!</h2>
            <p className="text-center text-text-secondary mb-6">Sign in to continue to your Digital Twin.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="email" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password-login" className="block text-sm font-medium text-text-secondary">Password</label>
                     <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="lock" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            id="password-login"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
                
                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-secondary focus:ring-brand-accent border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">Remember me</label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-brand-secondary hover:text-brand-primary">Forgot your password?</a>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent">
                        Sign In
                    </button>
                </div>
            </form>
             <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-text-secondary">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div>
                        <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                             <Icon name="google" className="w-5 h-5" />
                        </a>
                    </div>
                    <div>
                        <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                           <Icon name="facebook" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
             <p className="mt-8 text-center text-sm text-gray-600">
                Not a member?{' '}
                <button onClick={onNavigateToSignUp} className="font-medium text-brand-secondary hover:text-brand-primary">
                    Sign up now
                </button>
            </p>
        </div>
    );
};

export default Login;
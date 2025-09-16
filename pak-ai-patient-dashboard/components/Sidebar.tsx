
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import type { View } from '../types';
import Icon from './shared/Icon';
import DeviceManager from './DeviceManager';

interface SidebarProps {
    activeView: View;
    onViewChange: (view: View) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onLogout }) => {
    return (
        <aside className="w-64 bg-brand-primary text-white flex flex-col p-4">
            <div className="flex items-center mb-10">
                <div className="bg-white p-2 rounded-lg mr-3">
                    <Icon name="health-bot" className="w-6 h-6 text-brand-primary" />
                </div>
                <h1 className="text-xl font-bold">MyCenna Ai</h1>
            </div>

            <nav className="flex-1">
                <ul>
                    {NAVIGATION_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onViewChange(item.id);
                                }}
                                className={`flex items-center py-3 px-4 my-1 rounded-lg transition-colors ${
                                    activeView === item.id
                                        ? 'bg-brand-secondary'
                                        : 'hover:bg-brand-secondary/50'
                                }`}
                            >
                                <Icon name={item.icon} className="w-5 h-5 mr-3" />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto">
                 <DeviceManager />
                <div className="mt-6 border-t border-white/20 pt-4">
                     <div className="flex items-center mb-4">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://i.pravatar.cc/100"
                            alt="User Avatar"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-semibold">Alex Doe</p>
                            <p className="text-xs text-gray-300">alex.doe@example.com</p>
                        </div>
                    </div>
                     <button
                        onClick={onLogout}
                        className="w-full flex items-center py-2 px-4 rounded-lg text-sm hover:bg-brand-secondary/50 transition-colors"
                    >
                        <Icon name="logout" className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
                 <div className="text-center text-xs text-gray-400 mt-4">
                    © 2024 MyCenna Ai
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
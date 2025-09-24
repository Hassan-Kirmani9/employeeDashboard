import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-500/10',
    green: 'bg-green-500 text-green-600 bg-green-50 dark:bg-green-500/10',
    red: 'bg-red-500 text-red-600 bg-red-50 dark:bg-red-500/10',
    yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-500/10',
};

export const StatsCard = ({ title, value, icon: Icon, trend, color }: StatsCardProps) => {
    const colors = colorClasses[color].split(' ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
                        </div>
                    )}
                </div>
                <div className={`p-4 rounded-lg ${colors[2]} ${colors[3]}`}>
                    <Icon className={`w-8 h-8 ${colors[1]}`} />
                </div>
            </div>
        </motion.div>
    );
};
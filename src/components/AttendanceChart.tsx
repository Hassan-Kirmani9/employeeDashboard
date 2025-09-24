import { useMemo } from 'react';
import type { Attendance } from '../types';

interface AttendanceChartProps {
  attendance: Attendance[];
}

export const AttendanceChart = ({ attendance }: AttendanceChartProps) => {
  const stats = useMemo(() => {
    const present = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent' || a.status === 'leave').length;
    const total = present + absent;
    
    return {
      present,
      absent,
      presentPercentage: total > 0 ? (present / total) * 100 : 0,
      absentPercentage: total > 0 ? (absent / total) * 100 : 0,
    };
  }, [attendance]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Attendance Overview</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Present</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">{stats.present} days</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${stats.presentPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-red-700 dark:text-red-400">Absent/Leave</span>
            <span className="text-sm font-medium text-red-700 dark:text-red-400">{stats.absent} days</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full transition-all"
              style={{ width: `${stats.absentPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
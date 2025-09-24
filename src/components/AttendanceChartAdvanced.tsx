import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Attendance } from '../types';
import { Calendar, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

interface AttendanceChartAdvancedProps {
  attendance: Attendance[];
}

const COLORS = {
  present: '#10b981',
  late: '#f59e0b',
  absent: '#ef4444',
  leave: '#3b82f6',
};

export const AttendanceChartAdvanced = ({ attendance }: AttendanceChartAdvancedProps) => {
  const chartData = useMemo(() => {
    const weeklyData: Record<string, { week: string; present: number; late: number; absent: number; leave: number }> = {};
    
    attendance.forEach((record) => {
      if (record.status === 'weekend') return;
      
      const date = new Date(record.date);
      const weekNum = Math.ceil(date.getDate() / 7);
      const weekKey = `Week ${weekNum}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { week: weekKey, present: 0, late: 0, absent: 0, leave: 0 };
      }
      
      if (record.status === 'present') weeklyData[weekKey].present++;
      if (record.status === 'late') weeklyData[weekKey].late++;
      if (record.status === 'absent') weeklyData[weekKey].absent++;
      if (record.status === 'leave') weeklyData[weekKey].leave++;
    });
    
    return Object.values(weeklyData);
  }, [attendance]);

  const pieData = useMemo(() => {
    const stats = {
      present: attendance.filter(a => a.status === 'present').length,
      late: attendance.filter(a => a.status === 'late').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      leave: attendance.filter(a => a.status === 'leave').length,
    };
    
    return [
      { name: 'Present', value: stats.present, color: COLORS.present },
      { name: 'Late', value: stats.late, color: COLORS.late },
      { name: 'Absent', value: stats.absent, color: COLORS.absent },
      { name: 'Leave', value: stats.leave, color: COLORS.leave },
    ].filter(item => item.value > 0);
  }, [attendance]);

  const hoursData = useMemo(() => {
    return attendance
      .filter(a => a.totalMinutes > 0)
      .slice(-14)
      .map(record => ({
        date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hours: (record.totalMinutes / 60).toFixed(1),
      }));
  }, [attendance]);

  return (
    <div className="space-y-6">
      {/* Weekly Attendance Bar Chart - Full Width */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Attendance</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="week" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }} 
            />
            <Legend />
            <Bar dataKey="present" fill={COLORS.present} radius={[8, 8, 0, 0]} />
            <Bar dataKey="late" fill={COLORS.late} radius={[8, 8, 0, 0]} />
            <Bar dataKey="absent" fill={COLORS.absent} radius={[8, 8, 0, 0]} />
            <Bar dataKey="leave" fill={COLORS.leave} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Hours Trend & Pie Chart - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Trend Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hours Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
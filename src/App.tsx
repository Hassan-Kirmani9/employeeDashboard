import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { ProfileCard } from './components/ProfileCard';
import { AttendanceTable } from './components/AttendanceTable';
import { PerformanceReviews } from './components/PerformanceReviews';
import { AttendanceChartAdvanced } from './components/AttendanceChartAdvanced';
import { StatsCard } from './components/StatsCard';
import type { Employee, Attendance, PerformanceReview } from './types';

// Import mock data
import employeeData from './mock-data/employeeProfile.json';
import attendanceData from './mock-data/attendance.json';
import performanceData from './mock-data/performanceReviews.json';

function App() {
  const [employee, setEmployee] = useState<Employee>(employeeData as Employee);
  const [attendance] = useState<Attendance[]>(attendanceData as Attendance[]);
  const [reviews] = useState<PerformanceReview[]>(performanceData as PerformanceReview[]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const stats = useMemo(() => {
    const present = attendance.filter(a => a.status === 'present').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const totalWorking = present + late;
    const avgMinutes = totalWorking > 0 
      ? attendance.filter(a => a.totalMinutes > 0).reduce((sum, a) => sum + a.totalMinutes, 0) / totalWorking
      : 0;
    
    return {
      totalPresent: present + late,
      totalAbsent: absent,
      avgHours: (avgMinutes / 60).toFixed(1),
      attendanceRate: ((present + late) / (present + late + absent) * 100).toFixed(0),
    };
  }, [attendance]);

  const handleProfileUpdate = (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee);
    setSuccessMessage('✨ Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Employee Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {employee.name.split(' ')[0]}! 👋</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Days Present"
            value={stats.totalPresent}
            icon={Calendar}
            color="green"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={TrendingUp}
            color="blue"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Avg Hours/Day"
            value={`${stats.avgHours}h`}
            icon={Clock}
            color="purple"
          />
          <StatsCard
            title="Days Absent"
            value={stats.totalAbsent}
            icon={Users}
            color="red"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Profile Card */}
        <div className="mb-8">
          <ProfileCard employee={employee} onUpdate={handleProfileUpdate} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Attendance Table */}
          <div className="lg:col-span-2 space-y-8">
            <AttendanceTable attendance={attendance} />
          </div>

          {/* Right Column - Charts and Performance */}
          <div className="space-y-8">
            <PerformanceReviews reviews={reviews} />
          </div>
        </div>

        {/* Full Width Charts */}
        <div className="mt-8">
          <AttendanceChartAdvanced attendance={attendance} />
        </div>
      </div>
    </div>
  );
}

export default App;
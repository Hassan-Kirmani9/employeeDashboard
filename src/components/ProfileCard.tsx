import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Check, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import type { Employee, Department } from '../types';

import departmentsData from '../mock-data/departments.json';

interface ProfileCardProps {
  employee: Employee;
  onUpdate: (employee: Employee) => void;
}

export const ProfileCard = ({ employee, onUpdate }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setDepartments(departmentsData as Department[]);
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={employee.avatarUrl}
                alt={employee.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=6366f1&color=fff&size=128`;
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{employee.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{employee.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{employee.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Mail className="w-4 h-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(employee.joinedOn).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit Profile"
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.form
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold mb-6">Edit Profile</h3>

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />

              {errors.phone && <p className="text-red-200 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" className="text-gray-900">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name} className="text-gray-900">
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && <p className="text-red-200 text-sm mt-1">{errors.department}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors font-semibold"
              >
                <Check className="w-5 h-5" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(employee);
                  setErrors({});
                }}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-semibold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
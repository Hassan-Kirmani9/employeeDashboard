export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  avatarUrl: string;
  location: string;
  joinedOn: string;
}

export interface Attendance {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  totalMinutes: number;
  status: 'present' | 'absent' | 'late' | 'leave' | 'weekend';
}

export interface PerformanceReview {
  id: string;
  period: string;
  score: number;
  rating: 'green' | 'yellow' | 'red';
  reviewer: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface UIState {
  loading: {
    profile: boolean;
    attendance: boolean;
    performance: boolean;
  };
  errors: {
    profile: string | null;
    attendance: string | null;
    performance: string | null;
  };
  filters: {
    attendanceSearch: string;
    status: string;
  };
  theme: string;
}

export interface AttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalLeave: number;
  avgHoursPerDay: number;
}
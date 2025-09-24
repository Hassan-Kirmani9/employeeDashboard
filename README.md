# Employee Dashboard - SaaS HR Product

A modern, responsive Employee Dashboard built with React, TypeScript, and Tailwind CSS. Features attendance tracking, performance reviews, profile management, and data visualizations.

## 🚀 Features

- **Employee Profile Management** - View and edit employee information
- **Attendance History** - Searchable, filterable table with pagination
- **Performance Reviews** - Visual display of review scores with color-coded ratings
- **Data Visualizations** - Interactive charts showing attendance patterns and trends
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Loading States** - Smooth loading animations and transitions
- **Empty State Handling** - Graceful handling of missing or empty data

## 📋 Requirements Met

✅ **Employee Dashboard Layout**
- Profile Card with name, role, department, and profile picture
- Attendance History table with search and filter functionality
- Performance Review Summary with color-coded ratings

✅ **Profile Edit Form**
- Update name, phone number, and department
- Form validation (phone number format, required fields)
- Success message on update

✅ **Attendance Visualization**
- Weekly attendance bar chart
- Hours trend line chart
- Attendance distribution pie chart

✅ **UI/UX & Responsiveness**
- Professional design with modern aesthetics
- Mobile-friendly responsive layout
- Proper error states and feedback messages

✅ **Edge Cases & Error Handling**
- Empty data scenarios
- Form validation errors
- Loading state simulation

✅ **Code Quality**
- TypeScript implementation
- Component-based architecture
- Reusable components
- Clean, documented code

✅ **Bonus Features**
- Dark mode toggle
- Unit tests for helper functions and components
- Advanced animations with Framer Motion

## 🛠 Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite 7.1.7
- **Testing**: Vitest with React Testing Library

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20.19.0 or higher recommended)
- npm or yarn package manager

### Steps to Run

1. **Clone or download the project**
```bash
git clone <repository-url>
cd employee-dashboard

Install dependencies

bashnpm install

Start development server

bashnpm run dev

Open in browser
Navigate to http://localhost:5173

Additional Commands
bash# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run linting
npm run lint
📁 Project Structure
employee-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AttendanceChartAdvanced.tsx
│   │   ├── AttendanceTable.tsx
│   │   ├── PerformanceReviews.tsx
│   │   ├── ProfileCard.tsx
│   │   └── StatsCard.tsx
│   ├── mock-data/           # JSON data files
│   │   ├── attendance.json
│   │   ├── attendance.empty.json
│   │   ├── departments.json
│   │   ├── employeeProfile.json
│   │   ├── employeeProfile.invalid.json
│   │   ├── performanceReviews.json
│   │   └── uiState.json
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Helper functions
│   │   ├── helpers.ts
│   │   └── helpers.test.ts
│   ├── test/                # Test setup
│   │   └── setup.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── package.json            # Project dependencies
📊 Data Sources
All data is sourced from JSON files in the src/mock-data/ directory:

Employee Profile: employeeProfile.json
Attendance Records: attendance.json
Performance Reviews: performanceReviews.json
Departments: departments.json
UI State: uiState.json

🔧 Configuration
Testing Different Data States
To test with empty attendance data:
typescript// In src/App.tsx, replace:
import attendanceData from './mock-data/attendance.json';
// With:
import attendanceData from './mock-data/attendance.empty.json';
To test with invalid profile data:
typescript// In src/App.tsx, replace:
import employeeData from './mock-data/employeeProfile.json';
// With:
import employeeData from './mock-data/employeeProfile.invalid.json';
🎨 Customization
Themes

Default theme can be changed in src/App.tsx
Dark mode colors are configured in Tailwind classes
Additional themes can be added by extending the color system

Pagination

Items per page can be modified in AttendanceTable.tsx
Currently set to 10 items per page

Charts

Chart colors and styling can be customized in AttendanceChartAdvanced.tsx
Additional chart types can be added using Recharts components

🧪 Testing
The project includes unit tests for:

Utility functions (helpers.ts)
Component rendering and interactions
Form validation logic

Run tests with:
bashnpm run test
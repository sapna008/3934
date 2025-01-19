# Project Title
A Team Productivity and Performance Tracking Application for Employees and Employers

---

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Team Members](#team-members)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [File Structure](#file-structure)
7. [Usage](#usage)
8. [License](#license)

---

## Introduction
This application is designed to streamline team productivity and enhance task tracking efficiency. Built with modern technologies like React.js for the frontend and Firebase Realtime Database for the backend, it offers a seamless experience. Employers can manage teams, assign tasks, and monitor performance analytics, while employees can complete tasks, view their performance, and stay updated via notifications.

---

## Features

### General Features:
- User authentication for **Employee** and **Employer** roles. For example, employees can securely log in to access their personalized dashboards, while employers manage team data with admin-level access.
- Clean and responsive user interface that ensures smooth navigation across devices. Imagine an employee quickly checking their tasks on a mobile device or an employer generating reports on a desktop.

### Employer Features:
- Add employees and assign tasks.
- Generate performance analytics and reports.
- Track team productivity metrics with visual charts.
- **Notifications:** Alerts for task deadlines and performance updates.
- **Leaderboard:** Displays top-performing employees.

### Employee Features:
- View and complete assigned tasks.
- Track personal performance through points and streaks.
- Receive notifications about urgent tasks and deadlines.
- **Task Management:** Task assignment with priority, type, and difficulty levels.

---

## Team Members
This project was a collaborative effort with significant contributions from:
- **Divyansh Chandel (Team Lead):** Managed overall project coordination and development, including ensuring smooth integration of features and resolving cross-functional challenges.
- **Ashish:** Focused on implementing **Login** functionality and **Analytics** features. Ashish overcame challenges related to managing user sessions and visualizing complex data efficiently.
- **Sapna:** Designed and implemented the **User Interface** and **Gamification** features like points, Leaderboard and Team Challenges. Sapna addressed issues such as maintaining responsive designs across devices and integrating gamified elements seamlessly into the user experience.

---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase Realtime Database, Axios for API requests
- **UI/UX Enhancements**: Lucide-React icons, Recharts for analytics
- **Other Libraries**: React Router, TSParticles (for animations)

---

## Setup Instructions

### Prerequisites:
- Node.js installed on your system
- A Firebase project with Realtime Database enabled

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/sapna008/3934.git
   ```
2. Navigate to the project folder:
   ```bash
   cd /3934
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure Firebase:
   - Add your Firebase project's API keys and database URL in an `.env` file.
5. Start the application:
   ```bash
   npm run dev
   ```
6. Open the application in your browser at `http://localhost:3000`.

---

## File Structure
```
project-folder/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx
│   │   ├── EmployeeView.jsx
│   │   ├── EmployerView.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── NotificationCenter.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── particle.jsx
│   │   ├── popup.jsx
│   │   └── Reports.jsx
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── index.html
├── package.json
└── package-lock.json
```

---

## Usage

### For Employers:
1. Log in as an employer.
2. Add employees via the "Add Employee" feature.
3. Assign tasks and monitor team performance in the analytics section.

### For Employees:
1. Log in as an employee.
2. View and complete tasks in your dashboard.
3. Track your points and achievements through the leaderboard.

---

## License
This project is licensed under the MIT License.


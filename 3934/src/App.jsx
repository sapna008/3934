import React from 'react';
import Leaderboard from './components/Leaderboard';
import NotificationCenter from './components/NotificationCenter';
import TeamChallenges from './components/TeamChallenges';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Employee Productivity Tracker</h1>
            <NotificationCenter />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Leaderboard />
          </div>
          <div className="space-y-8">
            <TeamChallenges />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
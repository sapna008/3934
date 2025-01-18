// src/components/Dashboard.jsx
import React from 'react';
import Leaderboard from './Leaderboard';
import NotificationCenter from './NotificationCenter';
import TeamChallenges from './TeamChallenges';
import ParticlesComponent from './particle';

const MyCombinepages = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Particle Background */}
      <ParticlesComponent id="particles" className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header
          className="bg-white shadow-sm"
          style={{
            backgroundColor: 'rgba(57, 57, 63, 0.24)', // Dark blue with transparency
            color: 'white',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold">Employee Productivity Tracker</h1>
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
    </div>
  );
};

export default MyCombinepages;

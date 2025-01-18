import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const mockEmployees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    points: 2500,
    badges: [],
    completedTasks: 45
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    points: 2300,
    badges: [],
    completedTasks: 42
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    points: 2100,
    badges: [],
    completedTasks: 38
  }
];

const Leaderboard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6"
    style={{
      backgroundColor: 'rgba(57, 57, 63, 0.24)', // Dark blue with 90% transparency
      color: 'white',
    }}
    >
      <div className="flex items-center gap-2 mb-6" >
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold ">Top Performers</h2>
      </div>
      
      <div className="space-y-4">
        {mockEmployees.map((employee, index) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            style={{
              backgroundColor: 'rgba(57, 57, 63, 0.24)', // Dark blue with 90% transparency
              color: 'white',
            }}
          >
            <div className="flex items-center gap-4" >
              {index === 0 && <Medal className="w-6 h-6 text-yellow-500" />}
              {index === 1 && <Medal className="w-6 h-6 text-gray-200" />}
              {index === 2 && <Medal className="w-6 h-6 text-amber-700" />}
              
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div>
                <h3 className="font-semibold ">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.completedTasks} tasks completed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-purple-600">{employee.points} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
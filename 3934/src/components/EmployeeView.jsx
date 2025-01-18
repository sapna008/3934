import React, { useState, useEffect } from 'react';
import { LineChart, Clock, Award, Bell, Menu } from 'lucide-react';
import axios from 'axios';
import { Notifications } from './NotificationCenter';
import { Leaderboard } from './Leaderboard';
import { TeamChallenges } from './TeamChallenges';

export function EmployeeView({ user }) {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchPoints();
  }, [user.name]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json');
      if (response.data) {
        const tasksArray = Object.entries(response.data)
          .map(([id, task]) => ({ id, ...task }))
          .filter(task => task.assignedTo === user.name && task.status === 'pending')
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setTasks(tasksArray);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchPoints = async () => {
    try {
      const response = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/points.json');
      if (response.data) {
        const userPoints = Object.values(response.data)
          .filter(point => point.userName === user.name)
          .reduce((total, point) => total + point.points, 0);
        setPoints(userPoints);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const completeTask = async (task) => {
    try {
      await axios.patch(`https://hackathon-bf312-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        status: 'completed',
        completedAt: new Date().toISOString()
      });

      const pointsMap = {
        easy: 50,
        medium: 100,
        hard: 200
      };
      const earnedPoints = pointsMap[task.difficulty];

      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/points.json', {
        userName: user.name,
        points: earnedPoints,
        taskId: task.id,
        taskName: task.taskName,
        timestamp: new Date().toISOString()
      });

      fetchTasks();
      fetchPoints();
      alert(`Task completed! You earned ${earnedPoints} points!`);
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task');
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors.medium;
  };

  const getTaskTypeColor = (type) => {
    const colors = {
      'BAU': 'bg-gray-100 text-gray-800',
      'Ad Hoc': 'bg-purple-100 text-purple-800',
      'Project-Based': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || colors.BAU;
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-500/30 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-200" />
              <span className="ml-3 text-xl font-semibold text-gray-100">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <Bell className="h-6 w-6 text-gray-200 hover:text-gray-600"/>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 transform">
                    <Notifications user={user} />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                  alt={user.name}
                />
                <span className="ml-2 text-gray-100">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 p-6 bg-gray-100/10 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Welcome, {user.name}!</h2>
          <div className="bg-gray-400 px-4 py-2 rounded-full">
            <span className="text-white font-semibold">Total Points: {points}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-600/20 text-white p-6 rounded-lg shadow-md backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">My Tasks</h3>
              {tasks.length === 0 ? (
                <p className="text-gray-300">No pending tasks</p>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{task.taskName}</h4>
                          <p className="text-gray-300 mt-1">{task.description}</p>
                        </div>
                        <button
                          onClick={() => completeTask(task)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Complete
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-full text-sm ${getTaskTypeColor(task.taskType)}`}>
                            {task.taskType}
                          </span>
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                            Priority: {task.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          Difficulty: <span className="capitalize">{task.difficulty}</span>
                        </div>
                        <div className="text-sm text-gray-300">
                          Est. Time: {task.estimatedTime}h
                        </div>
                      </div>

                      <div className="text-sm text-gray-300">
                        <p>Assigned by: {task.assignedBy}</p>
                        {task.reference && <p>Reference: {task.reference}</p>}
                      </div>

                      {task.supportingLinks && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-400">Supporting Links:</p>
                          <div className="text-sm text-blue-600">
                            {task.supportingLinks.split('\n').map((link, index) => (
                              <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                                {link}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Leaderboard />
            <TeamChallenges user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
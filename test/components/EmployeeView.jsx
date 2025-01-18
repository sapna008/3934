import React, { useState, useEffect } from 'react';
import { LineChart, Clock, Award } from 'lucide-react';
import axios from 'axios';

export function EmployeeView({ user }) {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);

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
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp
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
      // Update task status
      await axios.patch(`https://hackathon-bf312-default-rtdb.firebaseio.com/tasks/${task.id}.json`, {
        status: 'completed',
        completedAt: new Date().toISOString()
      });

      // Calculate points based on difficulty
      const pointsMap = {
        easy: 50,
        medium: 100,
        hard: 200
      };
      const earnedPoints = pointsMap[task.difficulty];

      // Add points to points table
      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/points.json', {
        userName: user.name,
        points: earnedPoints,
        taskId: task.id,
        taskName: task.taskName,
        timestamp: new Date().toISOString()
      });

      // Refresh tasks and points
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
    <div className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
        <div className="bg-blue-100 px-4 py-2 rounded-full">
          <span className="text-blue-800 font-semibold">Total Points: {points}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Time Tracking</h3>
          </div>
          <p className="text-gray-600">Track your working hours and breaks</p>
        </div>
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <LineChart className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Performance</h3>
          </div>
          <p className="text-gray-600">View your performance metrics and goals</p>
        </div>
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <Award className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Achievements</h3>
          </div>
          <p className="text-gray-600">Check your achievements and rewards</p>
        </div>
      </div>

      <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4">My Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No pending tasks</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{task.taskName}</h4>
                    <p className="text-gray-600 mt-1">{task.description}</p>
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
                  <div className="text-sm text-gray-600">
                    Difficulty: <span className="capitalize">{task.difficulty}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Est. Time: {task.estimatedTime}h
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Assigned by: {task.assignedBy}</p>
                  {task.reference && <p>Reference: {task.reference}</p>}
                </div>

                {task.supportingLinks && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Supporting Links:</p>
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
  );
}
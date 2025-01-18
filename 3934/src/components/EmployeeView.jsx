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
          .filter(task => task.assignedTo === user.name && task.status === 'pending');
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
        status: 'completed'
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800/70 backdrop-blur-md rounded-lg shadow-xl max-w-5xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Welcome, {user.name}!</h2>
          <div className="bg-blue-600 px-4 py-2 rounded-full">
            <span className="text-white font-semibold">Total Points: {points}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Time Tracking</h3>
            </div>
            <p className="text-gray-300">Track your working hours and breaks</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-4">
              <LineChart className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Performance</h3>
            </div>
            <p className="text-gray-300">View your performance metrics and goals</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Achievements</h3>
            </div>
            <p className="text-gray-300">Check your achievements and rewards</p>
          </div>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">My Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-300">No pending tasks</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-600 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white">{task.taskName}</h4>
                    <p className="text-sm text-gray-400">
                      Difficulty: <span className="capitalize">{task.difficulty}</span>
                    </p>
                    <p className="text-sm text-gray-400">Assigned by: {task.assignedBy}</p>
                  </div>
                  <button
                    onClick={() => completeTask(task)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Complete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Users, BarChart, FileText } from 'lucide-react';
import axios from 'axios';

export function EmployerView({ user }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: '',
    assignedTo: '',
    difficulty: 'easy'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json', {
        ...taskData,
        status: 'pending',
        assignedBy: user.name,
        timestamp: new Date().toISOString()
      });
      alert('Task assigned successfully!');
      setTaskData({ taskName: '', assignedTo: '', difficulty: 'easy' });
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Failed to assign task');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800/70 backdrop-blur-md rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Welcome, {user.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => setShowTaskForm(true)}
          >
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Team Management</h3>
            </div>
            <p className="text-gray-300">Manage your team members and roles</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-4">
              <BarChart className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Analytics</h3>
            </div>
            <p className="text-gray-300">View team performance and productivity metrics</p>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-lg">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Reports</h3>
            </div>
            <p className="text-gray-300">Generate and view detailed reports</p>
          </div>
        </div>

        {showTaskForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">Assign New Task</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    value={taskData.taskName}
                    onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Assign To (Team Member Name)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    value={taskData.assignedTo}
                    onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    value={taskData.difficulty}
                    onChange={(e) => setTaskData({ ...taskData, difficulty: e.target.value })}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Assign Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

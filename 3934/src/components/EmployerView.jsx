import React, { useState } from 'react';
import { Users, BarChart, FileText, X } from 'lucide-react';
import axios from 'axios';

export function EmployerView({ user }) {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: '',
    description: '',
    assignedTo: '',
    taskType: 'BAU',
    difficulty: 'easy',
    priority: 'medium',
    estimatedTime: '',
    reference: '',
    supportingLinks: '',
    status: 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json', {
        ...taskData,
        assignedBy: user.name,
        timestamp: new Date().toISOString()
      });
      alert('Task assigned successfully!');
      setTaskData({
        taskName: '',
        description: '',
        assignedTo: '',
        taskType: 'BAU',
        difficulty: 'easy',
        priority: 'medium',
        estimatedTime: '',
        reference: '',
        supportingLinks: '',
        status: 'pending'
      });
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Failed to assign task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-600/10 bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-gradient-to-br from-gray-600/20 via-gray-900/20 to-gray-800/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome, {user.name}
              </h1>
              <p className="mt-2 text-gray-400">Manage your team and track performance</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team Management Card */}
              <div 
                onClick={() => setShowTaskForm(true)}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">Team Management</h3>
                  </div>
                  <p className="text-gray-400">Manage your team members and roles</p>
                </div>
              </div>

              {/* Analytics Card */}
              <div className="hover:scale-105 transition-all duration-300">
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                      <BarChart className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">Analytics</h3>
                  </div>
                  <p className="text-gray-400">Track team performance and productivity metrics</p>
                </div>
              </div>

              {/* Reports Card */}
              <div className="hover:scale-105 transition-all duration-300">
                <div className="h-full bg-gray-600/20 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">Reports</h3>
                  </div>
                  <p className="text-gray-400">Generate and view detailed team reports</p>
                </div>
              </div>
            </div>

            {/* Task Form Modal */}
            {showTaskForm && (
              <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl w-full max-w-3xl border border-gray-700/50 shadow-2xl">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                    <h2 className="text-2xl font-semibold text-white">Assign New Task</h2>
                    <button 
                      onClick={() => setShowTaskForm(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Scrollable Form Container */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    <div className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Form fields remain the same */}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Name
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.taskName}
                              onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Assign To (Team Member Name)
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.assignedTo}
                              onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Type
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.taskType}
                              onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}
                            >
                              <option value="BAU">BAU (Business As Usual)</option>
                              <option value="Ad Hoc">Ad Hoc</option>
                              <option value="Project-Based">Project-Based</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Priority Level
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.priority}
                              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Difficulty Level
                            </label>
                            <select
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.difficulty}
                              onChange={(e) => setTaskData({ ...taskData, difficulty: e.target.value })}
                            >
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Estimated Time (hours)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              required
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                              value={taskData.estimatedTime}
                              onChange={(e) => setTaskData({ ...taskData, estimatedTime: e.target.value })}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Reference (Manager/Colleague)
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.reference}
                              onChange={(e) => setTaskData({ ...taskData, reference: e.target.value })}
                              placeholder="Name of manager or colleague who requested this task"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Task Description
                            </label>
                            <textarea
                              required
                              rows={4}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.description}
                              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Supporting Links/Documents
                            </label>
                            <textarea
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                              value={taskData.supportingLinks}
                              onChange={(e) => setTaskData({ ...taskData, supportingLinks: e.target.value })}
                              placeholder="Add relevant links to documents, emails, or resources (one per line)"
                            />
                          </div>
                        </div>

                        {/* Button Container - Fixed at bottom */}
                        <div className="flex justify-end space-x-4 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowTaskForm(false)}
                            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                          >
                            Assign Task
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerView;
import React, { useState } from 'react';
import { Users, BarChart, FileText } from 'lucide-react';
import axios from 'axios';

export function EmployerView({ user }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: '',
    description: '',
    assignedTo: '',
    taskType: 'BAU', // BAU, Ad Hoc, Project-Based
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
    <div className="p-6 bg-white/80 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome, {user.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setShowTaskForm(true)}
        >
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Team Management</h3>
          </div>
          <p className="text-gray-600">Manage your team members and roles</p>
        </div>
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <BarChart className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Analytics</h3>
          </div>
          <p className="text-gray-600">View team performance and productivity metrics</p>
        </div>
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Reports</h3>
          </div>
          <p className="text-gray-600">Generate and view detailed reports</p>
        </div>
      </div>

      {showTaskForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Assign New Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Task Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-md"
                    value={taskData.taskName}
                    onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                  />
                </div>

                {/* Assign To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To (Team Member Name)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-md"
                    value={taskData.assignedTo}
                    onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                  />
                </div>

                {/* Task Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Type
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={taskData.taskType}
                    onChange={(e) => setTaskData({ ...taskData, taskType: e.target.value })}
                  >
                    <option value="BAU">BAU (Business As Usual)</option>
                    <option value="Ad Hoc">Ad Hoc</option>
                    <option value="Project-Based">Project-Based</option>
                  </select>
                </div>

                {/* Priority Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={taskData.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={taskData.difficulty}
                    onChange={(e) => setTaskData({ ...taskData, difficulty: e.target.value })}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Estimated Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Time (hours)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    className="w-full p-2 border rounded-md"
                    value={taskData.estimatedTime}
                    onChange={(e) => setTaskData({ ...taskData, estimatedTime: e.target.value })}
                  />
                </div>

                {/* Reference */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference (Manager/Colleague)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={taskData.reference}
                    onChange={(e) => setTaskData({ ...taskData, reference: e.target.value })}
                    placeholder="Name of manager or colleague who requested this task"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full p-2 border rounded-md"
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  />
                </div>

                {/* Supporting Links */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supporting Links/Documents
                  </label>
                  <textarea
                    rows={2}
                    className="w-full p-2 border rounded-md"
                    value={taskData.supportingLinks}
                    onChange={(e) => setTaskData({ ...taskData, supportingLinks: e.target.value })}
                    placeholder="Add relevant links to documents, emails, or resources (one per line)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
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
  );
}
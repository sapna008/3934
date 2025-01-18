import axios from 'axios';

import React, { useState } from 'react';

let url="https://emplyee-18cd7-default-rtdb.firebaseio.com/users.json"


function TaskLogging() {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    timeSpent: '',
    priority: '',
    category: '',
    reference: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit =  async(e) => {
    e.preventDefault();
    
    setTasks([...tasks, taskData]);
    await axios.post(url,taskData);
    setTaskData({
      title: '',
      description: '',
      timeSpent: '',
      priority: '',
      category: '',
      reference: '',
    });
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Log a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="timeSpent"
          value={taskData.timeSpent}
          onChange={handleChange}
          placeholder="Time Spent (e.g., 2 hours)"
          className="w-full p-2 border rounded"
        />
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          name="category"
          value={taskData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="BAU">BAU</option>
          <option value="Ad Hoc">Ad Hoc</option>
          <option value="Project-Based">Project-Based</option>
        </select>
        <input
          type="text"
          name="reference"
          value={taskData.reference}
          onChange={handleChange}
          placeholder="Reference (Manager or Colleague)"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6">Task Timeline</h3>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="p-4 border rounded">
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Time Spent:</strong> {task.timeSpent}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Category:</strong> {task.category}
            </p>
            <p>
              <strong>Reference:</strong> {task.reference}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskLogging;

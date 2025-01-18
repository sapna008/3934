import React, { useState, useEffect } from 'react';
import { Target, Users, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export function TeamChallenges({ user }) {
  const [challenges, setChallenges] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetchChallenges();
  }, [user.name]);

  const fetchChallenges = async () => {
    try {
      // Fetch tasks to calculate progress
      const tasksResponse = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/tasks.json');
      
      if (tasksResponse.data) {
        const tasks = Object.values(tasksResponse.data);
        const weekStart = new Date();
        weekStart.setHours(0, 0, 0, 0);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        // Calculate progress for different challenges
        const adHocTasksCompleted = tasks.filter(task => 
          task.status === 'completed' &&
          task.taskType === 'Ad Hoc' &&
          new Date(task.completedAt) > weekStart
        ).length;

        const highPriorityCompleted = tasks.filter(task => 
          task.status === 'completed' &&
          task.priority === 'high' &&
          new Date(task.completedAt) > weekStart
        ).length;

        // Define active challenges
        const activeChallenges = [
          {
            id: 1,
            title: 'Ad Hoc Heroes',
            description: 'Complete 5 Ad Hoc tasks this week',
            target: 5,
            current: adHocTasksCompleted,
            icon: <Target className="w-6 h-6 text-purple-500" />,
            reward: '300 bonus points'
          },
          {
            id: 2,
            title: 'Priority Masters',
            description: 'Complete 3 high-priority tasks this week',
            target: 3,
            current: highPriorityCompleted,
            icon: <Users className="w-6 h-6 text-blue-500" />,
            reward: '200 bonus points'
          }
        ];

        setChallenges(activeChallenges);
        setProgress({
          adHocTasks: adHocTasksCompleted,
          highPriority: highPriorityCompleted
        });
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  return (
    <div className="bg-gray-600/20 text-white p-6 rounded-lg shadow-md backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <Target className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-bold">Team Challenges</h3>
      </div>

      <div className="space-y-6">
        {challenges.map(challenge => (
          <div key={challenge.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {challenge.icon}
                <h4 className="text-lg font-semibold ml-2">{challenge.title}</h4>
              </div>
              {challenge.current >= challenge.target && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-200 mb-3">{challenge.description}</p>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-100 mb-1">
                <span>Progress</span>
                <span>{challenge.current}/{challenge.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-200">
              <span className="font-medium">Reward:</span> {challenge.reward}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
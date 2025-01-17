import React from 'react';
import { Target, Users, ArrowRight } from 'lucide-react';

const challenges = [
  {
    id: '1',
    title: 'Task Master Challenge',
    description: 'Complete 50 tasks as a team this week',
    progress: 65,
    reward: '500 team points',
    deadline: '3 days left'
  },
  {
    id: '2',
    title: 'Ad Hoc Heroes',
    description: 'Handle 20 ad hoc requests with high satisfaction',
    progress: 40,
    reward: 'Team lunch voucher',
    deadline: '5 days left'
  },
  {
    id: '3',
    title: 'Collaboration Kings',
    description: 'Achieve 95% task handover satisfaction',
    progress: 80,
    reward: 'Extra day off',
    deadline: '2 days left'
  }
];

const TeamChallenges = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800">Team Challenges</h2>
      </div>

      <div className="space-y-6">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-medium">{challenge.reward}</span>
              </div>
              <span className="text-gray-500">{challenge.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamChallenges;
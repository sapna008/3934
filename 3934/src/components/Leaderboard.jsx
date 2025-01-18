import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import axios from 'axios';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('week'); // week, month, allTime

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('https://hackathon-bf312-default-rtdb.firebaseio.com/points.json');
      if (response.data) {
        // Convert points data to array and group by user
        const pointsData = Object.values(response.data);
        const userPoints = pointsData.reduce((acc, point) => {
          const date = new Date(point.timestamp);
          const now = new Date();
          
          // Filter based on timeframe
          if (
            (timeframe === 'week' && date > new Date(now - 7 * 24 * 60 * 60 * 1000)) ||
            (timeframe === 'month' && date > new Date(now - 30 * 24 * 60 * 60 * 1000)) ||
            timeframe === 'allTime'
          ) {
            acc[point.userName] = (acc[point.userName] || 0) + point.points;
          }
          return acc;
        }, {});

        // Convert to array and sort
        const sortedLeaderboard = Object.entries(userPoints)
          .map(([name, points]) => ({ name, points }))
          .sort((a, b) => b.points - a.points)
          .slice(0, 5); // Top 5 users

        setLeaderboard(sortedLeaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          Leaderboard
        </h3>
        <select
          className="px-3 py-1 rounded-md border border-gray-200"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="allTime">All Time</option>
        </select>
      </div>

      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <div
            key={user.name}
            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100"
          >
            <div className="flex items-center">
              {index === 0 ? (
                <Award className="w-6 h-6 text-yellow-500 mr-2" />
              ) : index === 1 ? (
                <Award className="w-6 h-6 text-gray-400 mr-2" />
              ) : index === 2 ? (
                <Award className="w-6 h-6 text-amber-600 mr-2" />
              ) : (
                <Star className="w-6 h-6 text-blue-400 mr-2" />
              )}
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-lg">{user.points}</span>
              <span className="text-sm text-gray-500 ml-1">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { X, Download, Search, Filter, RefreshCcw } from 'lucide-react';

export function Reports({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');
  const [isGeneratingAIReport, setIsGeneratingAIReport] = useState(false);

  // Sample data - in a real app, this would come from your backend
  const reportsData = [
    {
      id: '1',
      name: 'Team Performance Report',
      team: 'Development',
      taskType: 'Project',
      completionRate: 87,
      timeframe: 'Monthly',
      date: '2024-03-01'
    },
    {
      id: '2',
      name: 'Task Analysis Report',
      team: 'Design',
      taskType: 'BAU',
      completionRate: 92,
      timeframe: 'Weekly',
      date: '2024-03-10'
    },
    // Add more sample data as needed
  ];

  const filteredReports = useMemo(() => {
    return reportsData.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = filterTeam === 'all' || report.team === filterTeam;
      const matchesTimeframe = filterTimeframe === 'all' || report.timeframe === filterTimeframe;
      
      return matchesSearch && matchesTeam && matchesTimeframe;
    });
  }, [searchTerm, filterTeam, filterTimeframe]);

  const generateAIReport = () => {
    setIsGeneratingAIReport(true);
    // Simulate AI report generation
    setTimeout(() => {
      setIsGeneratingAIReport(false);
      alert('AI-powered custom report has been generated!');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-600/20 backdrop-blur-md rounded-2xl w-full max-w-6xl border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-semibold text-white">Reports Dashboard</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
              >
                <option value="all">All Teams</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>

              <select
                className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                value={filterTimeframe}
                onChange={(e) => setFilterTimeframe(e.target.value)}
              >
                <option value="all">All Timeframes</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            {/* Generate AI Report Button */}
            <button
              onClick={generateAIReport}
              disabled={isGeneratingAIReport}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
            >
              {isGeneratingAIReport ? (
                <RefreshCcw className="w-5 h-5 animate-spin" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
              Generate Report
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left p-3 text-gray-300">Report Name</th>
                  <th className="text-left p-3 text-gray-300">Team</th>
                  <th className="text-left p-3 text-gray-300">Task Type</th>
                  <th className="text-left p-3 text-gray-300">Completion Rate</th>
                  <th className="text-left p-3 text-gray-300">Timeframe</th>
                  <th className="text-left p-3 text-gray-300">Date</th>
                  <th className="text-left p-3 text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                    <td className="p-3 text-white">{report.name}</td>
                    <td className="p-3 text-white">{report.team}</td>
                    <td className="p-3 text-white">{report.taskType}</td>
                    <td className="p-3 text-white">{report.completionRate}%</td>
                    <td className="p-3 text-white">{report.timeframe}</td>
                    <td className="p-3 text-white">{report.date}</td>
                    <td className="p-3">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={() => alert(`Downloading ${report.name}...`)}
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Activity, Database, AlertCircle } from 'lucide-react';

export default function SummaryPage() {
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fileId = localStorage.getItem('file_id');
      if (!fileId) {
        setError('No active dataset found. Please upload a file first.');
        setLoading(false);
        return;
      }

      try {
        const sumRes = await api.get(`/dataset/summary?file_id=${fileId}`);
        setSummary(sumRes.data);
        
        try {
          const statsRes = await api.get(`/analysis/stats?file_id=${fileId}`);
          setStats(statsRes.data.numerical_stats);
        } catch (err) {
          console.warn("Could not fetch stats. Dataset might have missing values or no numerical columns.", err);
        }
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch dataset summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading summary...</div>;
  
  if (error) return (
    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-6 rounded-lg max-w-2xl mx-auto mt-10">
      <AlertCircle size={24} />
      <p className="font-medium">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Data Summary</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <Database size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Rows</p>
            <p className="text-3xl font-bold text-gray-800">{summary?.num_rows}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Columns</p>
            <p className="text-3xl font-bold text-gray-800">{summary?.num_columns}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Column Details & Statistics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-semibold">Column Name</th>
                <th className="px-6 py-4 font-semibold">Data Type</th>
                <th className="px-6 py-4 font-semibold">Mean</th>
                <th className="px-6 py-4 font-semibold">Median</th>
                <th className="px-6 py-4 font-semibold">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {summary?.columns.map((col) => {
                const isNumeric = stats && stats[col];
                const colStats = isNumeric ? stats[col] : null;
                return (
                  <tr key={col} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{col}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs bg-gray-100 inline-block mt-3 ml-6 rounded px-2 py-1">
                      {summary?.data_types[col]}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {colStats ? colStats.mean.toFixed(2) : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {colStats ? colStats.median.toFixed(2) : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {colStats ? colStats.variance.toFixed(2) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

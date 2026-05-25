import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Lightbulb, AlertCircle, ChevronRight } from 'lucide-react';

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const fileId = localStorage.getItem('file_id');
      if (!fileId) {
        setError('No active dataset found.');
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/insights?file_id=${fileId}`);
        setInsights(res.data.insights);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to generate insights.');
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-500">Generating AI Insights...</div>;

  if (error) return (
    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-6 rounded-lg max-w-2xl mx-auto mt-10">
      <AlertCircle size={24} />
      <p className="font-medium">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b pb-4">
        <Lightbulb className="text-amber-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Automated Insights</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-amber-50 border-b border-amber-100">
          <h2 className="text-lg font-bold text-amber-900">Key Observations Discovered</h2>
          <p className="text-amber-700 text-sm mt-1">Rule-based insights derived from your active dataset</p>
        </div>
        <div className="divide-y divide-gray-100">
          {insights.length > 0 ? (
            insights.map((insight, idx) => (
              <div key={idx} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="mt-1 bg-amber-100 p-1.5 rounded-full text-amber-600">
                  <ChevronRight size={16} />
                </div>
                <div>
                  <p className="text-gray-800 leading-relaxed font-medium">{insight}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500 font-medium">
              No significant insights could be generated for this dataset.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

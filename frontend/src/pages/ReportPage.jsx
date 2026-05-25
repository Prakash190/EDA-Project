import { useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const fileId = localStorage.getItem('file_id');

  const handleOpenReport = () => {
    if (!fileId) return;
    setLoading(true);
    // Since the backend returns HTML directly, we can open it in a new tab
    const url = `http://localhost:8000/report?file_id=${fileId}`;
    window.open(url, '_blank');
    setLoading(false);
  };

  if (!fileId) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        No active dataset found. Please upload a file first.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-500 mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="text-blue-600" size={48} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Final EDA Report</h1>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
          The system has compiled all summaries, data cleaning results, insights, and visualizations into a comprehensive HTML report. 
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={handleOpenReport}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow"
          >
            <ExternalLink size={20} />
            View Full Report
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-6">
          Tip: You can save the report as a PDF by printing the page (Ctrl/Cmd + P) in the new tab.
        </p>
      </div>
    </div>
  );
}

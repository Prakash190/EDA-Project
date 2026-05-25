import { useState, useEffect } from 'react';
import api from '../api/axios';
import { BarChart, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function VisualizationDashboard() {
  const [columns, setColumns] = useState([]);
  const [plotType, setPlotType] = useState('histogram');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    const fetchColumns = async () => {
      const fileId = localStorage.getItem('file_id');
      if (!fileId) return;
      try {
        const res = await api.get(`/dataset/summary?file_id=${fileId}`);
        setColumns(res.data.columns);
        if (res.data.columns.length > 0) {
          setXColumn(res.data.columns[0]);
          setYColumn(res.data.columns[1] || res.data.columns[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchColumns();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const fileId = localStorage.getItem('file_id');
    if (!fileId) {
      setError('No active dataset found.');
      return;
    }

    setLoading(true);
    setError(null);
    setImageBase64(null);

    try {
      let endpoint = '';
      if (plotType === 'histogram') {
        endpoint = `/visualization/histogram?file_id=${fileId}&column=${xColumn}`;
      } else if (plotType === 'boxplot') {
        // Simple boxplot without grouping for now to avoid complexity
        endpoint = `/visualization/boxplot?file_id=${fileId}&column=${xColumn}`;
      } else if (plotType === 'scatter') {
        endpoint = `/visualization/scatter?file_id=${fileId}&x_column=${xColumn}&y_column=${yColumn}`;
      } else if (plotType === 'heatmap') {
        endpoint = `/visualization/heatmap?file_id=${fileId}`;
      }

      const res = await api.get(endpoint);
      setImageBase64(res.data.image_base64);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate visualization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b pb-4">
        <BarChart className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Visualization Engine</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Plot Settings</h2>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Plot Type</label>
              <select 
                value={plotType} 
                onChange={(e) => setPlotType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50"
              >
                <option value="histogram">Histogram</option>
                <option value="boxplot">Box Plot</option>
                <option value="scatter">Scatter Plot</option>
                <option value="heatmap">Correlation Heatmap</option>
              </select>
            </div>

            {plotType !== 'heatmap' && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <label className="text-sm font-semibold text-gray-700">
                  {plotType === 'scatter' ? 'X-Axis Column' : 'Column'}
                </label>
                <select 
                  value={xColumn} 
                  onChange={(e) => setXColumn(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50"
                >
                  {columns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {plotType === 'scatter' && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <label className="text-sm font-semibold text-gray-700">Y-Axis Column</label>
                <select 
                  value={yColumn} 
                  onChange={(e) => setYColumn(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50"
                >
                  {columns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-4"
            >
              {loading ? 'Rendering...' : 'Generate Plot'}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Display Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[500px]">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center text-gray-400">
              <ImageIcon size={64} className="mb-4 opacity-50" />
              <p className="font-medium text-lg">Rendering graphic...</p>
            </div>
          ) : imageBase64 ? (
            <div className="w-full animate-in zoom-in-95 duration-500">
              <img 
                src={`data:image/png;base64,${imageBase64}`} 
                alt="Generated Visualization" 
                className="max-w-full h-auto mx-auto rounded-xl shadow-sm border border-gray-100"
              />
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon size={64} className="mx-auto mb-4 opacity-30" />
              <p className="font-medium">Select parameters and generate a plot to view it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import api from '../api/axios';
import { Settings, Sparkles, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

export default function CleaningDashboard() {
  const [missingStrategy, setMissingStrategy] = useState('mean');
  const [normalizationMethod, setNormalizationMethod] = useState('min-max');
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [encodeCategorical, setEncodeCategorical] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleClean = async (e) => {
    e.preventDefault();
    const fileId = localStorage.getItem('file_id');
    if (!fileId) {
      setError('No active dataset found.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        file_id: fileId,
        missing_strategy: missingStrategy,
        normalization_method: normalizationMethod,
        remove_duplicates: removeDuplicates,
        encode_categorical: encodeCategorical
      };
      
      const res = await api.post('/clean', payload);
      setResult(res.data);
      // Update global fileId to the cleaned file ID
      localStorage.setItem('file_id', res.data.clean_file_id);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during cleaning.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b pb-4">
        <Sparkles className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Data Cleaning</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleClean} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Missing Values Strategy</label>
              <select 
                value={missingStrategy} 
                onChange={(e) => setMissingStrategy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="mean">Impute with Mean</option>
                <option value="median">Impute with Median</option>
                <option value="mode">Impute with Mode</option>
                <option value="drop">Drop Rows</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Normalization Method</label>
              <select 
                value={normalizationMethod} 
                onChange={(e) => setNormalizationMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="min-max">Min-Max Scaling</option>
                <option value="z-score">Z-Score Standardization</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8 py-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={removeDuplicates} 
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Remove Duplicates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={encodeCategorical} 
                onChange={(e) => setEncodeCategorical(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Encode Categorical Columns</span>
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex justify-center items-center gap-2"
          >
            {loading ? 'Cleaning Dataset...' : 'Execute Pipeline'}
            {!loading && <Settings size={18} />}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-green-50 rounded-2xl border border-green-100 p-8 mt-8 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 text-green-700 mb-6">
            <CheckCircle size={28} />
            <h2 className="text-2xl font-bold">Cleaning Successful!</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <p className="text-sm text-gray-500 font-semibold mb-2">Before</p>
              <p className="text-2xl font-bold text-gray-800">{result.summary_before.num_rows} <span className="text-sm font-normal text-gray-500">Rows</span></p>
              <p className="text-2xl font-bold text-gray-800">{result.summary_before.num_columns} <span className="text-sm font-normal text-gray-500">Cols</span></p>
            </div>
            
            <div className="flex justify-center text-green-600">
              <ArrowRight size={48} />
            </div>

            <div className="bg-white p-6 rounded-xl text-center shadow-sm border-2 border-green-200">
              <p className="text-sm text-green-600 font-semibold mb-2">After</p>
              <p className="text-2xl font-bold text-gray-800">{result.summary_after.num_rows} <span className="text-sm font-normal text-gray-500">Rows</span></p>
              <p className="text-2xl font-bold text-gray-800">{result.summary_after.num_columns} <span className="text-sm font-normal text-gray-500">Cols</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ensure CheckCircle is imported inside CleaningDashboard 
// I'll add it to the import.

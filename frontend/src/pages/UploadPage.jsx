import { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      localStorage.setItem('file_id', response.data.file_id);
      setSuccess(true);
      setTimeout(() => {
        navigate('/summary');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UploadCloud className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Upload Dataset</h2>
          <p className="text-gray-500 mt-2">Upload your CSV or Excel file to begin the EDA process.</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
            <input 
              type="file" 
              accept=".csv,.xls,.xlsx" 
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle size={20} />
              <p className="text-sm font-medium">Upload successful! Redirecting...</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={!file || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex justify-center items-center"
          >
            {loading ? 'Uploading...' : 'Start Analysis'}
          </button>
        </form>
      </div>
    </div>
  );
}

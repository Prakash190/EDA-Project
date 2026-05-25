import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Database, Zap, PieChart, Lock, ArrowRight, CheckCircle, BarChart2, Shield } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                EDA Insight
              </span>
            </div>
            <div className="flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Sign in
                  </Link>
                  <button 
                    onClick={handleGetStarted}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleGetStarted}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all flex items-center gap-2"
                >
                  Go to Dashboard <ArrowRight size={16}/>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 px-4 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-20 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            Automate Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Exploratory Data Analysis
            </span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Upload your dataset, and let our AI engine instantly clean, visualize, and generate actionable insights in seconds. Your personal automated data scientist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Analyzing Now <ArrowRight size={20} />
            </button>
            <a 
              href="#features"
              className="px-8 py-4 rounded-xl text-lg font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need for perfect data</h2>
            <p className="mt-4 text-lg text-gray-600">Powerful tools packed into an intuitive, seamless dashboard.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1-Click Cleaning</h3>
              <p className="text-gray-600">Automatically handle missing values, drop duplicates, and normalize columns with smart defaults or fine-grained control.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dynamic Visualizations</h3>
              <p className="text-gray-600">Instantly generate rich histograms, box plots, scatter plots, and correlation heatmaps to spot trends instantly.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-purple-900/5 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <PieChart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">Our rule-based engine automatically writes human-readable insights about outliers, skewness, and high correlations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How it works</h2>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {[
                { step: '1', title: 'Upload Data', desc: 'Securely upload your .csv or .xlsx files.' },
                { step: '2', title: 'Clean & Prep', desc: 'Fix missing values and encode data.' },
                { step: '3', title: 'Analyze', desc: 'View smart charts and AI insights.' },
                { step: '4', title: 'Export', desc: 'Download a full HTML EDA report.' },
              ].map((item, index) => (
                <div key={index} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center z-10">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-slate-50 shadow-sm">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-grade Security</h2>
            <p className="text-gray-600 text-lg">Your data is processed locally and never permanently stored. Uploaded datasets are destroyed upon session expiry or manual deletion.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold text-white">
              EDA Insight
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EDA Insight System. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

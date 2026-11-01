

 import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Database, Zap, PieChart, ArrowRight, BarChart2, Shield } from 'lucide-react';

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
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise-grade Security</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your data is processed locally and never permanently stored. Uploaded datasets are destroyed upon session expiry or manual deletion.
          </p>
        </div>
      </section>

      {/* Deep Green Agriculture-Themed Footer */}

          {/* Deep Green Agriculture-Themed Footer */}
      <footer className="bg-[#111111] text-gray-300 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-emerald-900/60 pb-12 pt-16">
            
            {/* Column 1: App Identity & Description */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-[#a3e635] p-2.5 rounded-xl text-black flex items-center justify-center">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg tracking-wider">EDA INSIGHT</h3>
                  <p className="text-[#a3e635] text-[10px] font-bold tracking-widest mt-0.5">AUTOMATE • CLEAN • VISUALIZE</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Growing Quality, Building Trust. Supporting your data parsing and analytical business workflows with precision automation mechanics.
              </p>
              
          

              {/* Social Networks Icons */}


              {/* Social Networks Icons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { 
                    name: 'instagram', 
                    url: '#',
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    )
                  },
                  { 
                    name: 'whatsapp', 
                    url: 'https://wa.me/qr/HFKTTNHA64MZD1',
                    icon: (
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.588 1.451 5.358 1.452 5.432.003 9.85-4.416 9.854-9.852.002-2.633-1.02-5.107-2.88-6.97C17.062 1.91 14.593.886 11.979.886c-5.438 0-9.86 4.419-9.864 9.856-.001 1.77.464 3.497 1.346 5.025l-.995 3.637 3.73-.978z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'linkedin', 
                    url: 'https://www.linkedin.com/in/prakash-ekatpure',
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    )
                  },
                  { 
                    name: 'github', 
                    url: 'https://github.com/Prakash190',
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#a3e635] hover:text-black transition-all"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>


            {/* Column 2: Quick Layout Directory */}
            <div className="space-y-4 md:pl-12">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#a3e635] after:mt-1">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm">
                {['Home', 'About Us', 'Our Products', 'Services', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#features" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                      <span className="text-[#a3e635] mr-2 text-xs font-bold transition-transform group-hover:translate-x-1">&gt;</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Custom Contact Identity Details */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#a3e635] after:mt-1">
                Get In Touch
              </h4>
              <ul className="space-y-3.5 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#a3e635] text-base mt-0.5">📍</span>
                  <span>Warje ,Pune,Maharashtra</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#a3e635] text-base">📞</span>
                  <a href="tel:+917722024814" className="hover:text-white transition-colors">+91 7722024814</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#a3e635] text-base">📩</span>
                  <a href="mailto:prakashekatpure45@gmail.com" className="hover:text-white transition-colors">
                    prakashekatpure45@gmail.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 pb-8 text-xs text-gray-500 gap-4">
            <div>
              © {new Date().getFullYear()} <span className="text-white font-semibold">EDA Insight</span>. All Rights Reserved.
            </div>
            
            <div className="text-gray-400">
              Developed with <span className="text-red-500">❤️</span> by{' '}
              <span className="text-[#a3e635] font-semibold">Prakash Ekatpure</span>
            </div>

            <div>
              <a href="" className="text-[#a3e635] hover:underline inline-flex items-center gap-1 font-medium">
                Visit Our Website 
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 2 0 002 2h10a2 2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

 
 
 
 
 {/* // import React from 'react';
  // import { Link, useNavigate } from 'react-router-dom';
  // import { Database, Zap, PieChart, Lock, ArrowRight, CheckCircle, BarChart2, Shield } from 'lucide-react';

  // export default function LandingPage() 
  //   const navigate = useNavigate();
  //   const isAuthenticated = !!localStorage.getItem('token');

  //   const handleGetStarted = () => { */}
  //     if (isAuthenticated) {
  //       navigate('/dashboard');
  //     } else {
  //       navigate('/signup');
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
        
  //       {/* Navigation */}
  //       <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="flex justify-between h-16 items-center">
  //             <div className="flex items-center gap-2">
  //               <Database className="h-8 w-8 text-blue-600" />
  //               <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
  //                 EDA Insight
  //               </span>
  //             </div>
  //             <div className="flex items-center gap-4">
  //               {!isAuthenticated ? (
  //                 <>
  //                   <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
  //                     Sign in
  //                   </Link>
  //                   <button 
  //                     onClick={handleGetStarted}
  //                     className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all"
  //                   >
  //                     Get Started
  //                   </button>
  //                 </>
  //               ) : (
  //                 <button 
  //                   onClick={handleGetStarted}
  //                   className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all flex items-center gap-2"
  //                 >
  //                   Go to Dashboard <ArrowRight size={16}/>
  //                 </button>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </nav>

  //       {/* Hero Section */}
  //       <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 px-4 overflow-hidden relative">
  //         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
  //             <div className="absolute top-20 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
  //             <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  //             <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  //         </div>

  //         <div className="max-w-5xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
  //           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
  //             Automate Your <br className="hidden sm:block" />
  //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
  //               Exploratory Data Analysis
  //             </span>
  //           </h1>
  //           <p className="mt-4 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
  //             Upload your dataset, and let our AI engine instantly clean, visualize, and generate actionable insights in seconds. Your personal automated data scientist.
  //           </p>
  //           <div className="flex flex-col sm:flex-row justify-center gap-4">
  //             <button 
  //               onClick={handleGetStarted}
  //               className="px-8 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
  //             >
  //               Start Analyzing Now <ArrowRight size={20} />
  //             </button>
  //             <a 
  //               href="#features"
  //               className="px-8 py-4 rounded-xl text-lg font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center"
  //             >
  //               See how it works
  //             </a>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Features Section */}
  //       <section id="features" className="py-20 bg-white">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center mb-16">
  //             <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need for perfect data</h2>
  //             <p className="mt-4 text-lg text-gray-600">Powerful tools packed into an intuitive, seamless dashboard.</p>
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all hover:-translate-y-1">
  //               <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
  //                 <Zap className="h-7 w-7 text-blue-600" />
  //               </div>
  //               <h3 className="text-xl font-bold text-gray-900 mb-3">1-Click Cleaning</h3>
  //               <p className="text-gray-600">Automatically handle missing values, drop duplicates, and normalize columns with smart defaults or fine-grained control.</p>
  //             </div>

  //             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all hover:-translate-y-1">
  //               <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
  //                 <BarChart2 className="h-7 w-7 text-indigo-600" />
  //               </div>
  //               <h3 className="text-xl font-bold text-gray-900 mb-3">Dynamic Visualizations</h3>
  //               <p className="text-gray-600">Instantly generate rich histograms, box plots, scatter plots, and correlation heatmaps to spot trends instantly.</p>
  //             </div>

  //             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-purple-900/5 transition-all hover:-translate-y-1">
  //               <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
  //                 <PieChart className="h-7 w-7 text-purple-600" />
  //               </div>
  //               <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
  //               <p className="text-gray-600">Our rule-based engine automatically writes human-readable insights about outliers, skewness, and high correlations.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* How It Works Section */}
  //       <section className="py-20 bg-slate-50">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center mb-16">
  //             <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How it works</h2>
  //           </div>

  //           <div className="relative">
  //             <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
  //             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                
  //               {[
  //                 { step: '1', title: 'Upload Data', desc: 'Securely upload your .csv or .xlsx files.' },
  //                 { step: '2', title: 'Clean & Prep', desc: 'Fix missing values and encode data.' },
  //                 { step: '3', title: 'Analyze', desc: 'View smart charts and AI insights.' },
  //                 { step: '4', title: 'Export', desc: 'Download a full HTML EDA report.' },
  //               ].map((item, index) => (
  //                 <div key={index} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center z-10">
  //                   <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-slate-50 shadow-sm">
  //                     {item.step}
  //                   </div>
  //                   <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
  //                   <p className="text-sm text-gray-600">{item.desc}</p>
  //                 </div>
  //               ))}

  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Trust Section */}
  //       <section className="py-20 bg-white">
  //         <div className="max-w-4xl mx-auto px-4 text-center">
  //             <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
  //             <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-grade Security</h2>
  //             <p className="text-gray-600 text-lg">Your data is processed locally and never permanently stored. Uploaded datasets are destroyed upon session expiry or manual deletion.</p>
  //         </div>
  //       </section>

  //       {/* Footer */}
  //       <footer className="bg-gray-900 py-12 border-t border-gray-800">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
  //           <div className="flex items-center gap-2">
  //             <Database className="h-6 w-6 text-blue-400" />
  //             <span className="text-lg font-bold text-white">
  //               EDA Insight
  //             </span>
  //           </div>
  //           <p className="text-gray-400 text-sm">
  //             © {new Date().getFullYear()} EDA Insight System. All rights reserved.
  //           </p>
  //           <div className="flex gap-4">
  //             <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
  //             <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
  //           </div>
  //         </div>
  //       </footer>
  //     </div>
  //   );
  // }

  // import React from 'react';
  // import { Facebook, Instagram, Linkedin } from 'lucide-react';

  // export default function Footer() {
  //   // WhatsApp icon markup inline to avoid extra dependency versions
  //   const WhatsAppIcon = () => (
  //     <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
  //       <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.588 1.451 5.358 1.452 5.432.003 9.85-4.416 9.854-9.852.002-2.633-1.02-5.107-2.88-6.97C17.062 1.91 14.593.886 11.979.886c-5.438 0-9.86 4.419-9.864 9.856-.001 1.77.464 3.497 1.346 5.025l-.995 3.637 3.73-.978z"/>
  //     </svg>
  //   );

  //   return (
  //     <footer className="bg-[#0b2914] text-gray-300 font-sans tracking-wide">
  //       <div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
          
  //         {/* Main Content Grid */}
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-emerald-900/60 pb-12">
            
  //           {/* Column 1: Branding & Intro */}
  //           <div className="space-y-5">
  //             <div className="flex items-center gap-3">
  //               <div className="bg-[#a3e635] p-2.5 rounded-xl text-black flex items-center justify-center">
  //                 {/* Sprout / Plant Icon */}
  //                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
  //                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  //                 </svg>
  //               </div>
  //               <div>
  //                 <h3 className="text-white font-extrabold text-lg tracking-wider">AAJI-AAJOBA AGROHUB</h3>
  //                 <p className="text-[#a3e635] text-[10px] font-bold tracking-widest mt-0.5">FARMING • QUALITY • TRUST</p>
  //               </div>
  //             </div>
  //             <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
  //               Growing Quality, Building Trust. Supporting our farms and wholesale business with care and sustainable practices.
  //             </p>
  //             {/* Social Icons Container */}
  //             <div className="flex items-center gap-3 pt-2">
  //               <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#a3e635] hover:text-black transition-all">
  //                 <Facebook size={16} />
  //               </a>
  //               <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#a3e635] hover:text-black transition-all">
  //                 <Instagram size={16} />
  //               </a>
  //               <a href="https://wa.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#a3e635] hover:text-black transition-all">
  //                 <WhatsAppIcon />
  //               </a>
  //               <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#a3e635] hover:text-black transition-all">
  //                 <Linkedin size={16} />
  //               </a>
  //             </div>
  //           </div>

  //           {/* Column 2: Quick Links */}
  //           <div className="space-y-4 md:pl-12">
  //             <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#a3e635] after:mt-1">
  //               Quick Links
  //             </h4>
  //             <ul className="space-y-2.5 text-sm">
  //               {['Home', 'About Us', 'Our Products', 'Services', 'Contact Us'].map((link) => (
  //                 <li key={link}>
  //                   <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="group flex items-center text-gray-400 hover:text-white transition-colors">
  //                     <span className="text-[#a3e635] mr-2 text-xs font-bold transition-transform group-hover:translate-x-1">&gt;</span>
  //                     {link}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>

  //           {/* Column 3: Get In Touch */}
  //           <div className="space-y-4">
  //             <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#a3e635] after:mt-1">
  //               Get In Touch
  //             </h4>
  //             <ul className="space-y-3.5 text-sm text-gray-400">
  //               <li className="flex items-start gap-3">
  //                 <span className="text-[#a3e635] text-base mt-0.5">📍</span>
  //                 <span>Jawala, Taluka Jamkhed, Ahilyanagar, Maharashtra</span>
  //               </li>
  //               <li className="flex items-center gap-3">
  //                 <span className="text-[#a3e635] text-base">📞</span>
  //                 <a href="tel:+917722024814" className="hover:text-white transition-colors">+91 7722024814</a>
  //               </li>
  //               <li className="flex items-center gap-3">
  //                 <span className="text-[#a3e635] text-base">✉️</span>
  //                 <a href="mailto:prakashekatpure45@gmail.com" className="hover:text-white transition-colors">
  //                   prakashekatpure45@gmail.com
  //                 </a>
  //               </li>
  //             </ul>
  //           </div>

  //         </div>

  //         {/* Bottom Bar Metas */}
  //         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-xs text-gray-500 gap-4">
  //           <div>
  //             © {new Date().getFullYear()} <span className="text-white font-semibold">Aaji-Aajoba AgroHub</span>. All Rights Reserved.
  //           </div>
            
  //           <div className="text-gray-400">
  //             Developed with <span className="text-red-500">❤️</span> by{' '}
  //             <span className="text-[#a3e635] font-semibold">Prakash Ekatpure</span>
  //           </div>

  //           <div>
  //             <a href="#" className="text-[#a3e635] hover:underline inline-flex items-center gap-1 font-medium">
  //               Visit Our Website 
  //               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
  //                 <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 2 0 00-2 2v10a2 2 2 0 002 2h10a2 2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  //               </svg>
  //             </a>
  //           </div>
  //         </div>

  //       </div>
  //     </footer>
  //   );
  // }

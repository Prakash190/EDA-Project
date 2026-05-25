import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Table, 
  Wrench, 
  BarChart2, 
  Lightbulb, 
  FileText,
  Database,
  LogOut
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileId = localStorage.getItem('file_id');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('file_id');
    navigate('/login');
  };

  const navItems = [
    { name: 'Upload', path: '/dashboard', icon: Upload },
    { name: 'Data Summary', path: '/summary', icon: Table, disabled: !fileId },
    { name: 'Cleaning', path: '/cleaning', icon: Wrench, disabled: !fileId },
    { name: 'Visualization', path: '/visualization', icon: BarChart2, disabled: !fileId },
    { name: 'Insights', path: '/insights', icon: Lightbulb, disabled: !fileId },
    { name: 'Report', path: '/report', icon: FileText, disabled: !fileId },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b flex items-center gap-3 text-blue-600">
          <Database size={28} />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">EDA Insight</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.disabled) {
              return (
                <div key={item.name} className="flex items-center gap-3 px-4 py-3 text-gray-400 bg-gray-50 rounded-lg cursor-not-allowed">
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        {fileId && (
          <div className="p-4 border-t bg-green-50 text-green-800 text-xs text-center break-all">
            <strong>Active Dataset:</strong><br/>
            {fileId.split('-')[0]}...
          </div>
        )}
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

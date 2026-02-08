import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, BarChart3, GraduationCap } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/study', label: 'Study', icon: BookOpen },
    { to: '/mock-test', label: 'Mock Test', icon: GraduationCap },
    { to: '/progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-aws-squid-ink text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🎉</span>
            <div>
              <h1 className="text-lg font-bold text-aws-orange leading-tight">
                AWS Cert Party
              </h1>
              <p className="text-xs text-gray-400">AIF-C01 Practice</p>
            </div>
          </Link>
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                    isActive
                      ? 'bg-aws-orange text-aws-squid-ink'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-aws-squid-ink text-gray-400 text-center py-4 text-xs">
        AWS Cert Party — Not affiliated with Amazon Web Services. For practice only.
      </footer>
    </div>
  );
}

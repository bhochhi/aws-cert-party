import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, BarChart3, GraduationCap, Package, ChevronDown } from 'lucide-react';
import { useCertification } from '../context/CertificationContext';
import { useState, useRef, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { cert, certifications, switchCert } = useCertification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/packs', label: 'Packs', icon: Package },
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

      {/* Certification Selector Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-aws-orange/50 shadow-sm transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span className="text-lg">{cert.icon}</span>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-aws-squid-ink leading-tight">
                  {cert.name}
                </p>
                <p className="text-xs text-gray-500">{cert.code}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select Certification
                  </p>
                </div>
                {certifications.map((c) => {
                  const isActive = c.id === cert.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        switchCert(c.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-aws-orange/10 border-l-3 border-aws-orange'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-aws-orange' : 'text-aws-squid-ink'}`}>
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-500">{c.code} · {c.domains.length} domains · {c.examConfig.totalQuestions} Qs</p>
                      </div>
                      {isActive && (
                        <span className="text-xs font-medium text-aws-orange bg-aws-orange/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
                {certifications.length === 1 && (
                  <div className="px-3 py-3 bg-gray-50 text-xs text-gray-500">
                    More certifications coming soon!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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

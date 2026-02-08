import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle } from 'lucide-react';
import { useCertification } from '../context/CertificationContext';
import { loadProgress } from '../utils/storage';

export default function CertificationsPage() {
  const navigate = useNavigate();
  const { certId, certifications, switchCert } = useCertification();

  function handleSelect(id: string) {
    switchCert(id);
    navigate('/');
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Award className="text-aws-orange" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-aws-squid-ink">Certifications</h1>
          <p className="text-sm text-gray-500">Select a certification to practice</p>
        </div>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => {
          const isActive = cert.id === certId;
          const progress = loadProgress(cert.id);
          const testsTaken = progress.results.length;

          return (
            <button
              key={cert.id}
              onClick={() => handleSelect(cert.id)}
              className={`w-full text-left bg-white rounded-xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-aws-orange ring-2 ring-aws-orange/30'
                  : 'border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{cert.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-aws-squid-ink text-lg">{cert.name}</h3>
                      {isActive && (
                        <CheckCircle className="text-aws-orange" size={18} />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{cert.code}</p>
                    <p className="text-sm text-gray-400 mt-1">{cert.description}</p>
                    <div className="flex gap-4 mt-3 text-xs text-gray-500">
                      <span>{cert.domains.length} domains</span>
                      <span>{cert.examConfig.totalQuestions} questions on exam</span>
                      <span>{cert.examConfig.timeLimit / 60000} min time limit</span>
                      {testsTaken > 0 && (
                        <span className="text-aws-orange font-medium">
                          {testsTaken} test{testsTaken > 1 ? 's' : ''} taken
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {certifications.length === 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>More coming soon!</strong> Additional AWS certification question banks
          will be added here. Each certification has its own question packs, exam config, and
          isolated progress tracking.
        </div>
      )}
    </div>
  );
}

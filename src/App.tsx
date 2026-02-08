import { HashRouter, Routes, Route } from 'react-router-dom';
import { CertificationProvider } from './context/CertificationContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudySelectPage from './pages/StudySelectPage';
import StudyPage from './pages/StudyPage';
import MockTestPage from './pages/MockTestPage';
import ProgressPage from './pages/ProgressPage';
import QuestionPacksPage from './pages/QuestionPacksPage';
import CertificationsPage from './pages/CertificationsPage';

export default function App() {
  return (
    <HashRouter>
      <CertificationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/packs" element={<QuestionPacksPage />} />
            <Route path="/study" element={<StudySelectPage />} />
            <Route path="/study/:domain" element={<StudyPage />} />
            <Route path="/mock-test" element={<MockTestPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </Layout>
      </CertificationProvider>
    </HashRouter>
  );
}

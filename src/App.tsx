import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudySelectPage from './pages/StudySelectPage';
import StudyPage from './pages/StudyPage';
import MockTestPage from './pages/MockTestPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<StudySelectPage />} />
          <Route path="/study/:domain" element={<StudyPage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

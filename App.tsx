import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Sponsorship } from './pages/Sponsorship';
import { GetInvolved } from './pages/GetInvolved';
import { Stories } from './pages/Stories';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <HashRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/programs/:id" element={<ProgramDetail />} />
                    <Route path="/sponsorship" element={<Sponsorship />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </HashRouter>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
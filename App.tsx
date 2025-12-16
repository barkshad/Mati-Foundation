import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
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
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';

// Define public routes wrapped in Layout and Transitions
const PublicRoutes: React.FC = () => {
  const location = ReactRouterDOM.useLocation();
  
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <ReactRouterDOM.Routes location={location} key={location.pathname}>
          <ReactRouterDOM.Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <ReactRouterDOM.Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <ReactRouterDOM.Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
          <ReactRouterDOM.Route path="/programs/:id" element={<PageTransition><ProgramDetail /></PageTransition>} />
          <ReactRouterDOM.Route path="/sponsorship" element={<PageTransition><Sponsorship /></PageTransition>} />
          <ReactRouterDOM.Route path="/get-involved" element={<PageTransition><GetInvolved /></PageTransition>} />
          <ReactRouterDOM.Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
          <ReactRouterDOM.Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <ReactRouterDOM.Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" replace />} />
        </ReactRouterDOM.Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <ReactRouterDOM.HashRouter>
          <ReactRouterDOM.Routes>
            {/* Admin Routes - No Transition Wrapper, No Public Layout */}
            <ReactRouterDOM.Route path="/admin/login" element={<AdminLogin />} />
            <ReactRouterDOM.Route path="/admin" element={<Admin />} />
            
            {/* Catch-all for Public Routes */}
            <ReactRouterDOM.Route path="*" element={<PublicRoutes />} />
          </ReactRouterDOM.Routes>
        </ReactRouterDOM.HashRouter>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
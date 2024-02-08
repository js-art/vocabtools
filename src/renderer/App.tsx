import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { Toaster } from 'sonner';
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Toaster richColors />
    </>
  );
}

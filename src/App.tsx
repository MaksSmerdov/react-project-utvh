import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentParameterKotel1 from './pages/kotelnaya/currentParam/currentParam-kotel1';
import CurrentParameterKotel2 from './pages/kotelnaya/currentParam/currentParam-kotel2';
import CurrentParameterKotel3 from './pages/kotelnaya/currentParam/currentParam-kotel3';
import MnemoKotel1 from './pages/kotelnaya/mnemo/mnemo-kotel1';
import MnemoKotel2 from './pages/kotelnaya/mnemo/mnemo-kotel2';
import MnemoKotel3 from './pages/kotelnaya/mnemo/mnemo-kotel3';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/currentParam-kotel1" element={<CurrentParameterKotel1 />} />
        <Route path="/currentParam-kotel2" element={<CurrentParameterKotel2 />} />
        <Route path="/currentParam-kotel3" element={<CurrentParameterKotel3 />} />

        <Route path="/mnemo-kotel1" element={<MnemoKotel1 />} />
        <Route path="/mnemo-kotel2" element={<MnemoKotel2 />} />
        <Route path="/mnemo-kotel3" element={<MnemoKotel3 />} />
      </Routes>
    </div>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import CurrentParameterKotel from './pages/kotelnaya/currentParam/currentParam-kotel';
import MnemoKotel from './pages/kotelnaya/mnemo/mnemoKotel';
import GraphLevelKotel from './pages/kotelnaya/graphics/graphLevel-kotel';
import GraphParKotel from './pages/kotelnaya/graphics/graphPar-kotel';
import CurrentParameterHvo1 from './pages/hvo/currentParam/currentParam-hvo1';
import CurrentParameterHvo2 from './pages/hvo/currentParam/currentParam-hvo2';
import MnemoHvo1 from './pages/hvo/mnemo/mnemo-hvo1';
import MnemoHvo2 from './pages/hvo/mnemo/mnemo-hvo2';
import GeneralLevelKotel from './pages/kotelnaya/graphics/general/graphGeneral-level';
import GeneralParKotel from './pages/kotelnaya/graphics/general/graphGeneral-par';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/currentParam-kotel1" element={<CurrentParameterKotel kotelNumber={1} />} />
        <Route path="/currentParam-kotel2" element={<CurrentParameterKotel kotelNumber={2} />} />
        <Route path="/currentParam-kotel3" element={<CurrentParameterKotel kotelNumber={3} />} />

        <Route path="/mnemo-kotel1" element={<MnemoKotel kotelNumber={1} />} />
        <Route path="/mnemo-kotel2" element={<MnemoKotel kotelNumber={2} />} />
        <Route path="/mnemo-kotel3" element={<MnemoKotel kotelNumber={3} />} />

        <Route path="/graphLevel-kotel1" element={<GraphLevelKotel kotelNumber={1} />} />
        <Route path="/graphLevel-kotel2" element={<GraphLevelKotel kotelNumber={2} />} />
        <Route path="/graphLevel-kotel3" element={<GraphLevelKotel kotelNumber={3} />} />

        <Route path="/graphPar-kotel1" element={<GraphParKotel kotelNumber={1} />} />
        <Route path="/graphPar-kotel2" element={<GraphParKotel kotelNumber={2} />} />
        <Route path="/graphPar-kotel3" element={<GraphParKotel kotelNumber={3} />} />

        <Route path="/graphPar-general" element={<GeneralParKotel />} />
        <Route path="/graphLevel-general" element={<GeneralLevelKotel />} />

        <Route path="/currentParam-hvo1" element={<CurrentParameterHvo1 />} />
        <Route path="/currentParam-hvo2" element={<CurrentParameterHvo2 />} />

        <Route path="/mnemo-hvo1" element={<MnemoHvo1 />} />
        <Route path="/mnemo-hvo2" element={<MnemoHvo2 />} />

      </Routes>
    </div>
  );
};

export default App;

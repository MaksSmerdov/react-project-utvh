import React from 'react';
import MnemoKotel from '../../../components/Mnemo/kotelnaya/mnemoKotel';

const MnemoKotel1: React.FC = () => {
  return <MnemoKotel configKey="kotel3" title="Котел №3" objectNumber={3} showLoading = {true} />;
};

export default MnemoKotel1;

import React from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';

const CurrentParameterKotel2: React.FC = () => {
  return <CurrentParameter config={apiConfigs.kotel2} title="Котел №2" showLoading={true} />;
};

export default CurrentParameterKotel2;

import React from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';

const CurrentParameterKotel3: React.FC = () => {
  return <CurrentParameter config={apiConfigs.kotel3} title="Котел №3"/>;
};

export default CurrentParameterKotel3;

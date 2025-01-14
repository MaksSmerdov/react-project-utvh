import React from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigKotelnaya';

const CurrentParameterKotel1: React.FC = () => {
  return <CurrentParameter config={apiConfigs.kotel1} title="Котел №1" showLoading = {true} />;
};

export default CurrentParameterKotel1;

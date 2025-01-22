import React from 'react';
import styles from '../../../../pages/hvo/mnemo/mnemo-hvo1.module.scss'; // Путь к стилям для ХВО1

export interface TooltippedParam {
  id: string;
  className: string;
  dataKey: string;
  source: string;
  naimenov: string;
  unit: string;
  width: string;
  responsiveWidth: { [key: string]: string };
  content: React.ReactNode; // Контент тултипа
}

const tooltipItemsHvo1 = [
  {
    id: 'davl-vhod-ustanivki',
    className: styles['davl-vhod-ustanivki'],
    dataKey: 'Давление воды на входе установки',
    source: 'parameters',
    naimenov: 'Давление на входе',
    unit: 'кгс/м²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: Датчик давления ДД-1
        <br />
        Диапазон: 0...10 бар
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),

  },
  {
    id: 'rashod-vody-na-ustanovky',
    className: styles['rashod-vody-na-ustanovky'],
    dataKey: 'Расход воды на установку (м3/ч)',
    source: 'parameters',
    naimenov: 'Расход воды',
    unit: 'м³/ч',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: Расходомер РМ-200
        <br />
        Диапазон: 0...20 м³/ч
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),


  },
  {
    id: 'davl-posle-nasosov-1-1-2-3',
    className: styles['davl-posle-nasosov-1-1-2-3'],
    dataKey: 'Давление воды после насосов H1/1,2,3',
    source: 'parameters',
    naimenov: 'Давление после насосов',
    unit: 'кгс/м²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: Датчик давления ДД-2
        <br />
        Диапазон: 0...15 бар
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),


  },
  {
    id: 'uroven-e1-1',
    className: styles['uroven-e1-1'],
    dataKey: 'Уровень воды в емкости E1/1',
    source: 'parameters',
    naimenov: 'Уровень E1/1',
    unit: 'мм',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: Уровнемер УЛ-100
        <br />
        Диапазон: 0...1000 мм
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),


  },
];

export default tooltipItemsHvo1;
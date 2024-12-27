// tooltipItems.tsx
import React from 'react';
import styles from '../mnemoKotel.module.scss'; // Путь к стилям

export interface TooltippedParam {
  id: string;
  className: string;
  dataKey: string;
  source: string;
  naimenov: string;
  unit: string;
  width: string;
  responsiveWidth: { [key: string]: string };
  content: React.ReactNode; // Добавляем свойство для контента тултипа
}

const tooltipItems = [
  {
    id: 'davlenieGaza',
    className: styles.ParamDavlenieGaza,
    dataKey: 'Давление газа котел №',
    source: 'parameters',
    naimenov: 'Давление газа',
    unit: 'кг/м²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: ПД-1М.1И
        <br />
        Диапазон: 0...40 кПа
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'davlenieVozduha',
    className: styles.ParamDavlenieVozduha,
    dataKey: 'Давление воздуха котел №',
    source: 'parameters',
    naimenov: 'Давление воздуха',
    unit: 'кг/м²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: ПД-1Н.42
        <br />
        Диапазон: 0...2,5 кПа
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'davleniePara',
    className: styles.ParamDavleniePara,
    dataKey: 'Давление пара котел №',
    source: 'parameters',
    naimenov: 'Давление пара',
    unit: 'кг/см²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: Метран-55-ДИ
        <br />
        Диапазон: 0...1,6 МПа
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'razrezhenie',
    className: styles.ParamRazrezhenie,
    dataKey: 'Разрежение в топке котел №',
    source: 'parameters',
    naimenov: 'Разрежение',
    unit: 'кг/м²',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: ПД-1ТН.42
        <br />
        Диапазон: -0,125...+0,125 кПа
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'urovenKotla',
    className: styles.ParamUroven,
    dataKey: 'Уровень в барабане котел №',
    source: 'parameters',
    naimenov: 'Уровень в барабане',
    unit: 'мм',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        Прибор: АИР-20/М2-Н-ДД
        <br />
        Диапазон: 0...6,3 кПа
        <br />
        Токовый выход: 4 - 20 мА
      </div>
    ),
  },
];

export default tooltipItems;

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
        МИДА-ДИ-15
        <br />
        <strong>Диапазон:</strong> 0...1 МПа
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
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
        <strong>Прибор:</strong> ПРИМ-80-1-0
        <br />
        <strong>Диаметр:</strong> Ду80
        <br />
        <strong>Расход:</strong> Qнаим=0,75 м3/ч
        <br />
        Qперех=1,5 м3/ч
        <br />
        Qнаиб=150 м3/ч
        <br />
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
        МИДА-ДИ-15
        <br />
        <strong>Диапазон:</strong> 0...1 МПа
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
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
        УГЦ-1.1
        <br />
        <strong>Диапазон:</strong> 0...1,6 м
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'uroven-e1-2',
    className: styles['uroven-e1-2'],
    dataKey: 'Уровень воды в емкости E1/2',
    source: 'parameters',
    naimenov: 'Уровень E1/2',
    unit: 'мм',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        УГЦ-1.1
        <br />
        <strong>Диапазон:</strong> 0...1,6 м
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'rashod-vody-na-promyvky',
    className: styles['rashod-vody-na-promyvky'],
    dataKey: 'Расход воды на промывку фильтров (м3/ч)',
    source: 'parameters',
    naimenov: 'Расход воды на промывку фильтров',
    unit: 'м3/ч',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Прибор:</strong> ПРИМ-100-1-0
        <br />
        <strong>Диаметр:</strong> Ду100
        <br />
        <strong>Расход:</strong> Qнаим=0,75 м3/ч
        <br />
        Qперех=1,5 м3/ч
        <br />
        Qнаиб=150 м3/ч
        <br />
      </div>
    ),
  },
  {
    id: 'davl-posle-nasosov-2-1-2',
    className: styles['davl-posle-nasosov-2-1-2'],
    dataKey: 'Давление воды после насосов H2/1,2',
    source: 'parameters',
    naimenov: 'Давление воды после насосов H2/1,2',
    unit: 'кгс/м2',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        МИДА-ДИ-15
        <br />
        <strong>Диапазон:</strong> 0...1 МПа
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
      </div>
    ),
  },
  {
    id: 'davl-posle-nasosov-3-1-2',
    className: styles['davl-posle-nasosov-3-1-2'],
    dataKey: 'Давление воды после насосов H2/1,2',
    source: 'parameters',
    naimenov: 'Давление воды после насосов H3/1,2 для промывки',
    unit: 'кгс/м2',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        МИДА-ДИ-15
        <br />
        <strong>Диапазон:</strong> 0...1 МПа
        <br />
        <strong>Токовый выход:</strong> 4 - 20 мА
      </div>
    ),
  },
];

export default tooltipItemsHvo1;

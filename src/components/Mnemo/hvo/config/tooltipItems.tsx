import React from 'react';
import stylesHvo1 from '../../../../pages/hvo/mnemo/mnemo-hvo1.module.scss'; // Путь к стилям для ХВО1
import stylesHvo2 from '../../../../pages/hvo/mnemo/mnemo-hvo2.module.scss'; // Путь к стилям для ХВО2

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

export const tooltipItemsHvo1 = [
  {
    id: 'davl-vhod-ustanivki',
    className: stylesHvo1['davl-vhod-ustanivki'],
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
    hasTooltip: true,
  },
  {
    id: 'rashod-vody-na-ustanovky',
    className: stylesHvo1['rashod-vody-na-ustanovky'],
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
    hasTooltip: true,
  },
  {
    id: 'davl-posle-nasosov-1-1-2-3',
    className: stylesHvo1['davl-posle-nasosov-1-1-2-3'],
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
    hasTooltip: true,
  },
  {
    id: 'uroven-e1-1',
    className: stylesHvo1['uroven-e1-1'],
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
    hasTooltip: true,
  },
  {
    id: 'uroven-e1-2',
    className: stylesHvo1['uroven-e1-2'],
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
    hasTooltip: true,
  },
  {
    id: 'rashod-vody-na-promyvky',
    className: stylesHvo1['rashod-vody-na-promyvky'],
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
    hasTooltip: true,
  },
  {
    id: 'davl-posle-nasosov-2-1-2',
    className: stylesHvo1['davl-posle-nasosov-2-1-2'],
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
    hasTooltip: true,
  },
  {
    id: 'davl-posle-nasosov-3-1-2',
    className: stylesHvo1['davl-posle-nasosov-3-1-2'],
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
    hasTooltip: true,
  },
  {
    id: 'kontrol-polozheniya-im1',
    className: stylesHvo1['kontrol-im-1'],
    dataKey: 'Контроль положения ИМ1',
    source: 'parameters',
    naimenov: 'Контроль положения ИМ1',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Контроль положения ИМ1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'zadanie-uroven-e1-1-2',
    className: stylesHvo1['zadanie-uroven-e1-1-2'],
    dataKey: 'Задание уровня воды в емкостях E1/1,2',
    source: 'parameters',
    naimenov: 'Задание уровня воды в емкостях E1/1,2',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Задание уровня воды в емкостях E1/1,2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'vikhod-ran-davleniya-vody-dlya-pch-h1-1',
    className: stylesHvo1['n1-1-percent'],
    dataKey: 'Выход РАН давления воды для ПЧ H1/1 (%)',
    source: 'parameters',
    naimenov: 'Выход РАН давления воды для ПЧ H1/1',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Выход РАН давления воды для ПЧ H1/1.
      </div>
    ),
    hasTooltip: false,
  },

  {
    id: 'rabochaya-chastota-nasosa-h1-1',
    className: stylesHvo1['n1-1-hz'],
    dataKey: 'Рабочая частота насоса H1/1 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H1/1',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H1/1.
      </div>
    ),
    hasTooltip: false,
  },

  {
    id: 'vikhod-ran-davleniya-vody-dlya-pch-h1-2',
    className: stylesHvo1['n1-2-percent'],
    dataKey: 'Выход РАН давления воды для ПЧ H1/2 (%)',
    source: 'parameters',
    naimenov: 'Выход РАН давления воды для ПЧ H1/2',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Выход РАН давления воды для ПЧ H1/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h1-2',
    className: stylesHvo1['n1-2-hz'],
    dataKey: 'Рабочая частота насоса H1/2 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H1/2',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H1/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'vikhod-ran-davleniya-vody-dlya-pch-h2-1',
    className: stylesHvo1['n2-1-percent'],
    dataKey: 'Выход РАН давления воды для ПЧ H2/1 (%)',
    source: 'parameters',
    naimenov: 'Выход РАН давления воды для ПЧ H2/1',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Выход РАН давления воды для ПЧ H2/1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h2-1',
    className: stylesHvo1['n2-1-hz'],
    dataKey: 'Рабочая частота насоса H2/1 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H2/1',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H2/1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'vikhod-ran-davleniya-vody-dlya-pch-h2-2',
    className: stylesHvo1['n2-2-percent'],
    dataKey: 'Выход РАН давления воды для ПЧ H2/2 (%)',
    source: 'parameters',
    naimenov: 'Выход РАН давления воды для ПЧ H2/2',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Выход РАН давления воды для ПЧ H2/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h2-2',
    className: stylesHvo1['n2-2-hz'],
    dataKey: 'Рабочая частота насоса H2/2 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H2/2',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H2/2.
      </div>
    ),
    hasTooltip: false,
  },
];

export const tooltipItemsHvo2 = [
  {
    id: 'rashod-vody-filtr',
    className: stylesHvo2['rashod-vody-filtr'],
    dataKey: 'Расход умягченной воды после Ф4/1,2,3',
    source: 'parameters',
    naimenov: 'Расход умягченной воды после Ф4/1,2,3',
    unit: 'м3/ч',
    width: '225px',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'rashod-kanalizacia',
    className: stylesHvo2['rashod-kanalizacia'],
    dataKey: 'Расход воды в канализацию',
    source: 'parameters',
    naimenov: 'Расход воды в канализацию',
    unit: 'м3/ч',
    width: '225px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Прибор:</strong> ПРИМ-50-1-0
        <br />
        <strong>Диаметр:</strong> Ду50
        <br />
        <strong>Расход:</strong> Qнаим=0,3 м3/ч
        <br />
        Qперех=0,6 м3/ч
        <br />
        Qнаиб=60 м3/ч
        <br />
      </div>
    ),
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-carbon',
    className: stylesHvo2['davlenie-carbon'],
    dataKey: 'Давление воды на карбон',
    source: 'parameters',
    naimenov: 'Давление воды на карбон',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-k265',
    className: stylesHvo2['davlenie-k265'],
    dataKey: 'Давление воды на к265',
    source: 'parameters',
    naimenov: 'Давление воды на к265',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-k312',
    className: stylesHvo2['davlenie-k312'],
    dataKey: 'Давление воды на к312',
    source: 'parameters',
    naimenov: 'Давление воды на к312',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'temper-e2-1-ug',
    className: stylesHvo2['temper-e2-1-ug'],
    dataKey: 'Температура в емкости E2/1 юг',
    source: 'parameters',
    naimenov: 'Температура в емкости E2/1 юг',
    unit: '°C',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        ДТС Овен
        <br />
        <strong>Длина:</strong> 800мм
        <br />
        <strong>Резьба:</strong> М20x1.5
      </div>
    ),
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'temper-e2-1-sever',
    className: stylesHvo2['temper-e2-1-sever'],
    dataKey: 'Температура в емкости E2/1 север',
    source: 'parameters',
    naimenov: 'Температура в емкости E2/1 север',
    unit: '°C',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        ДТС Овен
        <br />
        <strong>Длина:</strong> 800мм
        <br />
        <strong>Резьба:</strong> М20x1.5
      </div>
    ),
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'temper-e2-2-sever',
    className: stylesHvo2['temper-e2-2-sever'],
    dataKey: 'Температура в емкости E2/2 север',
    source: 'parameters',
    naimenov: 'Температура в емкости E2/2 север',
    unit: '°C',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        ДТС Овен
        <br />
        <strong>Длина:</strong> 800мм
        <br />
        <strong>Резьба:</strong> М20x1.5
      </div>
    ),
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'temper-e2-2-ug',
    className: stylesHvo2['temper-e2-2-ug'],
    dataKey: 'Температура в емкости E2/2 юг',
    source: 'parameters',
    naimenov: 'Температура в емкости E2/2 юг',
    unit: '°C',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        ДТС Овен
        <br />
        <strong>Длина:</strong> 800мм
        <br />
        <strong>Резьба:</strong> М20x1.5
      </div>
    ),
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n4-1',
    className: stylesHvo2['davlenie-n4-1'],
    dataKey: 'Давление воды после насоса H4/1',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H4/1',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n4-2',
    className: stylesHvo2['davlenie-n4-2'],
    dataKey: 'Давление воды после насоса H4/2',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H4/2',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n5-1',
    className: stylesHvo2['davlenie-n5-1'],
    dataKey: 'Давление воды после насоса H5/1',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H5/1',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n5-2',
    className: stylesHvo2['davlenie-n5-2'],
    dataKey: 'Давление воды после насоса H5/2',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H5/2',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n6-1',
    className: stylesHvo2['davlenie-n6-1'],
    dataKey: 'Давление воды после насоса H6/1',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H6/1',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n6-2',
    className: stylesHvo2['davlenie-n6-2'],
    dataKey: 'Давление воды после насоса H6/2',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H6/2',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-n6-3',
    className: stylesHvo2['davlenie-n6-3'],
    dataKey: 'Давление воды после насоса H6/3',
    source: 'parameters',
    naimenov: 'Давление воды после насоса H6/3',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'davlenie-posle-filtrov',
    className: stylesHvo2['davlenie-posle-filtrov'],
    dataKey: 'Давление воды после Ф4/1,2,3',
    source: 'parameters',
    naimenov: 'Давление воды после Ф4/1,2,3',
    unit: 'кгс/cм2',
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
    hasTooltip: true, // Этот параметр имеет тултип
  },
  {
    id: 'uroven-titan-e2-2',
    className: stylesHvo2['uroven-titan-e2-2'],
    dataKey: 'Уровень воды в E2/2 (Титан)',
    source: 'parameters',
    naimenov: 'Уровень воды в E2/2 (Титан)',
    unit: 'м',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    hasTooltip: false, // Этот параметр не имеет тултипа
  },
  {
    id: 'uroven-mida-e2-2',
    className: stylesHvo2['uroven-mida-e2-2'],
    dataKey: 'Уровень воды в E2/2 (Мида)',
    source: 'parameters',
    naimenov: 'Уровень воды в E2/2 (Мида)',
    unit: 'м',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    hasTooltip: false, // Этот параметр не имеет тултипа
  },
  {
    id: 'uroven-titan-e2-1',
    className: stylesHvo2['uroven-titan-e2-1'],
    dataKey: 'Уровень воды в E2/1 (Титан)',
    source: 'parameters',
    naimenov: 'Уровень воды в E2/1 (Титан)',
    unit: 'м',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Уровень воды в емкости.
      </div>
    ),
    hasTooltip: false, // Этот параметр имеет тултип
  },
  {
    id: 'uroven-mida-e2-1',
    className: stylesHvo2['uroven-mida-e2-1'],
    dataKey: 'Уровень воды в E2/1 (Мида)',
    source: 'parameters',
    naimenov: 'Уровень воды в E2/1 (Мида)',
    unit: 'м',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Уровень воды в емкости.
      </div>
    ),
    hasTooltip: false, // Этот параметр имеет тултип
  },
  {
    id: 'kontrol-polozheniya-im2',
    className: stylesHvo2['im2'],
    dataKey: 'Контроль положения ИМ2',
    source: 'parameters',
    naimenov: 'Контроль положения ИМ2',
    unit: '%',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Уровень контроля положения ИМ2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h4-1',
    className: stylesHvo2['n4-1-hz'],
    dataKey: 'Рабочая частота насоса H4/1 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H4/1',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H4/1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h4-2',
    className: stylesHvo2['n4-2-hz'],
    dataKey: 'Рабочая частота насоса H4/2 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H4/2',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H4/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h5-1',
    className: stylesHvo2['n5-1-hz'],
    dataKey: 'Рабочая частота насоса H5/1 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H5/1',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H5/1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h5-2',
    className: stylesHvo2['n5-2-hz'],
    dataKey: 'Рабочая частота насоса H5/2 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H5/2',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H5/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h6-1',
    className: stylesHvo2['n6-1-hz'],
    dataKey: 'Рабочая частота насоса H6/1 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H6/1',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H6/1.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h6-2',
    className: stylesHvo2['n6-2-hz'],
    dataKey: 'Рабочая частота насоса H6/2 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H6/2',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H6/2.
      </div>
    ),
    hasTooltip: false,
  },
  {
    id: 'rabochaya-chastota-nasosa-h6-3',
    className: stylesHvo2['n6-3-hz'],
    dataKey: 'Рабочая частота насоса H6/3 (Гц)',
    source: 'parameters',
    naimenov: 'Рабочая частота насоса H6/3',
    unit: 'Гц',
    width: '240px',
    responsiveWidth: { 'max-1280': '225px' },
    content: (
      <div>
        <strong>Информация:</strong> Рабочая частота насоса H6/3.
      </div>
    ),
    hasTooltip: false,
  },
];

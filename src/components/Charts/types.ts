export interface GenericReading {
  [key: string]: number; // Ключ — название параметра, значение — числовое измерение
}

export interface GenericData {
  lastUpdated: string; // Временная метка
  values: GenericReading; // Произвольные параметры
}

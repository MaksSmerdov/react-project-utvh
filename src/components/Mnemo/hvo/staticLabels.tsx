import React from 'react';
import styles from './staticLabels.module.scss';

const StaticLabels: React.FC = () => {
  return (
    <>
      {/* Статические подписи */}
      <p className={`${styles['mnemo__param-descr']} ${styles['pomeshenie-2-text']}`}>Помещение-2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['zadanie-uroven-e1-1-2-text']}`}>Задание</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f1-1-text']}`}>Ф1/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f1-2-text']}`}>Ф1/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f1-3-text']}`}>Ф1/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f1-4-text']}`}>Ф1/4</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f2-1-text']}`}>Ф2/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f2-2-text']}`}>Ф2/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f2-3-text']}`}>Ф2/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['e1-1-text']}`}>Е1/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['e1-2-text']}`}>Е1/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n1-1-text']}`}>H1/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n1-2-text']}`}>H1/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n1-3-text']}`}>H1/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n2-1-text']}`}>H2/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n2-2-text']}`}>H2/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n3-1-text']}`}>H3/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n3-2-text']}`}>H3/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['rashod-na-promyvku-text']}`}>Q на промывку</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['rashod-na-vhode-text']}`}>Q на входе</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['davl-vhod-ustanivki-text']}`}>P на входе</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['davl-posle-nasosov-1-1-2-3-text']}`}>
        P перед фильтрами
      </p>
      <p className={`${styles['mnemo__param-descr']} ${styles['kontrol-im-1-text']}`}>ИМ1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['davl-pered-f3-1-7-text']}`}>P перед Ф3/1-7</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['davl-posle-nasosov-3-1-2-text']}`}>
        P на промывку Ф1/1-4, Ф2/1-3
      </p>
    </>
  );
};

export default StaticLabels;
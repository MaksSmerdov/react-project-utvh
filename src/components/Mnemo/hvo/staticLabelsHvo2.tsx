import React from 'react';
import styles from './staticLabelsHvo2.module.scss';

const StaticLabelsHvo2: React.FC = () => {
  return (
    <>
      {/* Статические подписи */}
      <p className={`${styles['mnemo__param-descr']} ${styles['rashod-vody-filtr-text']}`}>
        Q умягченной воды после Ф4/1,2,3
      </p>
      <p className={`${styles['mnemo__param-descr']} ${styles['rashod-kanalizacia-text']}`}>Q воды в канализацию</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['davlenie-posle-filtrov-text']}`}>
        P воды после Ф4/1,2,3
      </p>
      <p className={`${styles['mnemo__param-descr']} ${styles['im2-text']}`}>ИМ2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-1-text']}`}>Ф3/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-2-text']}`}>Ф3/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-3-text']}`}>Ф3/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-4-text']}`}>Ф3/4</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-5-text']}`}>Ф3/5</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-6-text']}`}>Ф3/6</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f3-7-text']}`}>Ф3/7</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f4-1-text']}`}>Ф4/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f4-2-text']}`}>Ф4/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['f4-3-text']}`}>Ф4/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['e2-1-text']}`}>Е2/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['e2-2-text']}`}>Е2/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n4-1-text']}`}>H4/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n4-2-text']}`}>H4/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n5-1-text']}`}>H5/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n5-2-text']}`}>H5/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n6-1-text']}`}>H6/1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n6-2-text']}`}>H6/2</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['n6-3-text']}`}>H6/3</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['temper-e2-1-sever-text']}`}>T в E2/1 север</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['temper-e2-1-ug-text']}`}>T в E2/1 юг</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['temper-e2-2-sever-text']}`}>T в E2/2 север</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['temper-e2-2-ug-text']}`}>T в E2/2 юг</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['uroven-titan-e2-1-text']}`}>H воды (Титан)</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['uroven-mida-e2-1-text']}`}>H воды (Мида)</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['uroven-titan-e2-2-text']}`}>H воды (Титан)</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['uroven-mida-e2-2-text']}`}>H воды (Мида)</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['carbon-text']}`}>P воды на карбон</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['k265-text']}`}>P воды на к.265</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['k312-text']}`}>P воды на к.312</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['pomeshenie-text']}`}>Из помещения №1</p>
      <p className={`${styles['mnemo__param-descr']} ${styles['kanalizacia-text']}`}>В канализацию</p>
    </>
  );
};

export default StaticLabelsHvo2;

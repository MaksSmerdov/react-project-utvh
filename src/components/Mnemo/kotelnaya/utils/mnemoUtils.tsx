import styles from '../../../../pages/kotelnaya/mnemo/mnemoKotel.module.scss';

export const alarmLabels = [
  { text: <>Давл. воздуха низко</>, className: styles.alarmVozduhNizko, key: `Давление воздуха низко котел №` },
  { text: <>Давл. газа низко</>, className: styles.alarmGazNizko, key: `Давление газа низко котел №` },
  { text: <>Давл. газа высоко</>, className: styles.alarmGazVisoko, key: `Давление газа высоко котел №` },
  { text: <>Уровень воды низок</>, className: styles.alarmUrovenNizko, key: `Уровень низок котел №` },
  { text: <>Уровень воды высок</>, className: styles.alarmUrovenVisoko, key: `Уровень высок котел №` },
  { text: <>Факел горелки погас</>, className: styles.alarmFakelPogas, key: `Факел горелки погас котел №` },
  { text: <>Разрежение мало</>, className: styles.alarmRazrezhenieNizko, key: `Разрежение мало котел №` },
  { text: <>Дымосос отключен</>, className: styles.alarmDimososOff, key: `Дымосос отключен котел №` },
  { text: <>Санкц. останов котла</>, className: styles.alarmOstanovKotla, key: `Останов по команде котел №` },
];

export const infoLabels = [
  { text: <>Останов котла</>, className: styles.infoOstanovKotla, key: `Останов котла котел №` },
  { text: <>Режим вентиляции</>, className: styles.infoRezhimVent, key: `Режим вентиляции котел №` },
  { text: <>Розжиг запальника</>, className: styles.infoRozhigZapalnik, key: `Розжиг запальника котел №` },
  { text: <>Режим стаб. запальника</>, className: styles.infoStabZapalnik, key: `Режим стабилизации запальника котел №` },
  { text: <>Розжиг горелки</>, className: styles.infoRozhigGorelki, key: `Розжиг горелки котел №` },
  { text: <>Режим стаб. горелки</>, className: styles.infoStabGorelki, key: `Режим стабилизации горелки котел №` },
  { text: <>Рабочий режим</>, className: styles.infoRabRezhim, key: `Рабочий режим котел №` },
];

export const staticLabels = [
  { text: <>Вентилятор</>, className: styles.ventilatorText },
  { text: <>Дымосос</>, className: styles.dimososText },
];

export const imLabels = [
  { key: `ИМ уровня котел №`, className: styles.imUroven },
  { key: `ИМ разрежения котел №`, className: styles.imRazrezhenie },
  { key: `ИМ воздуха котел №`, className: styles.imVozduh },
  { key: `ИМ газа котел №`, className: styles.imGaz },
];
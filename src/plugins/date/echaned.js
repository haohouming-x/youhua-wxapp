import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn');

const FNSTRS = {
  'date': 'toDate',
  'string': 'toString',
  'temistamp': "valueOf"
}

const formatDefault = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD hh:mm:ss'
}

export default function EchanedDayjs(params) {

  let current = dayjs(params)

  return {
    /* type: date、string、timestamp */
    get(type='date') {
      const fncStr = FNSTRS[type];

      return current[fncStr]();
    },
    format(params) {
      if(Reflect.has(formatDefault, params)) {
        return current.format(formatDefault[params])
      }else {
        return current.format(params)
      }
    },

    diff(...args) {
      return current.diff(...args);
    },

    compute(execStrs) {
      const execList = execStrs.split(",");

      current = execList.reduce((acc, v) => {
        const execStr = v.replace(/^\s+|\s+$/g, "");
        const match = /^(([+-])?(\d+)?) *(millisecond?|ms|second?|s|minute?|m|hour?|h|day?|d|week?|w|month?|M|year?|y)?$/i.exec(execStr);

        if (!match) return acc;

        const [_, __, operator, number, symbol] = match;

        if (!number || !symbol) console.warn(`表达式"${_}"不是有效的表达式`);

        switch (operator) {
        case "+":
          return acc.add(number, symbol);
        case "-":
          return acc.subtract(number, symbol);
        case void 0:
          return acc.set(symbol, number);
        }
      }, current);

      return this;
    }
  }
}

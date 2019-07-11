/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import i18n from "../pages/i18n/locale.json";

// 扁平化 locale 配置
/**
 * 输入 {
 *  i18n:{
 *    zh:{name:'张'},
 *    en:{name:'zhang'}
 *  }
 * }
 * 输出：{
 *  zh:{
 *    i18n.name:'张'
 *  },
 *  en:{
 *    i18n.name:'zhang'
 *  }, *
 *  }
 * @param {*} obj
 */
function flatten(obj) {
  const zh = {};
  const en = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      for (const k in element.zh) {
        if (element.zh.hasOwnProperty(k)) {
          zh[`${key}.${k}`] = element.zh[k];
        }
      }
      for (const k in element.en) {
        if (element.en.hasOwnProperty(k)) {
          en[`${key}.${k}`] = element.en[k];
        }
      }
    }
  }
  return { zh,en };
}
const locale = flatten({
  i18n,
});
export default locale;

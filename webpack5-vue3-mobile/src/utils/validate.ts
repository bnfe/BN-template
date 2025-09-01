const MOBILE_REG: RegExp = /^1\d{10}$/; // 验证手机号
const EMAIL_REG: RegExp = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/; // 验证邮箱
const MONEY_REG: RegExp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; // 验证RMB
const NAME_REG: RegExp = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/; // 名字（包括中文、英文、数字）
const CHINESE_REG: RegExp = /^[\u4e00-\u9fa5]+$/; // 名字（中文）
const BANKNO_REG: RegExp = /^\d{16,19}$/; // 银行卡号
const PWD_REG: RegExp = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/; // 六位密码（包含英文、数字）

function isRule(regText: RegExp, value: string): boolean {
  if (!value || value.length === 0) return false;
  const reg = new RegExp(regText);
  if (!reg.test(value)) {
    return false;
  }
  return true;
}

const validate = {
  isMobile(mobile: string): boolean {
    // 手机号
    return isRule(MOBILE_REG, mobile);
  },
  isEmail(email: string): boolean {
    // 邮箱
    return isRule(EMAIL_REG, email);
  },
  isMoney(money: string): boolean {
    // RMB
    return isRule(MONEY_REG, money);
  },
  isName(name: string): boolean {
    // 名字（包括中文、英文、数字）
    return isRule(NAME_REG, name);
  },
  isChinese(name: string): boolean {
    // 名字（中文）
    return isRule(CHINESE_REG, name);
  },
  isBankNo(name: string): boolean {
    // 银行卡号
    return isRule(BANKNO_REG, name);
  },
  isPwd(pwd: string): boolean {
    // 六位密码（包含英文、数字）
    return isRule(PWD_REG, pwd);
  },
};

export default validate;

// ============================================================
// 信用卡号生成器工具函数
// 使用Luhn算法生成有效的测试信用卡号
// ============================================================

// ------------------------------------------------------------
// BIN数据库 - 包含各种卡类型和国家的BIN前缀
// ------------------------------------------------------------
export const BIN_DATABASE = {
  // Visa卡 - 以4开头
  visa: {
    name: 'Visa',
    prefixes: ['4'],
    length: 16,
    cvvLength: 3
  },
  // MasterCard - 以51-55或2221-2720开头
  mastercard: {
    name: 'MasterCard',
    prefixes: ['51', '52', '53', '54', '55', '2221', '2720'],
    length: 16,
    cvvLength: 3
  },
  // American Express - 以34或37开头
  amex: {
    name: 'American Express',
    prefixes: ['34', '37'],
    length: 15,
    cvvLength: 4
  },
  // Discover - 以6011, 644-649, 65开头
  discover: {
    name: 'Discover',
    prefixes: ['6011', '644', '645', '646', '647', '648', '649', '65'],
    length: 16,
    cvvLength: 3
  },
  // UnionPay - 以62开头
  unionpay: {
    name: 'UnionPay',
    prefixes: ['62'],
    length: 16,
    cvvLength: 3
  },
  // JCB - 以3528-3589开头
  jcb: {
    name: 'JCB',
    prefixes: ['3528', '3589'],
    length: 16,
    cvvLength: 3
  },
  // Maestro
  maestro: {
    name: 'Maestro',
    prefixes: ['5018', '5020', '5038', '6304'],
    length: 16,
    cvvLength: 3
  },
  // Diners Club
  diners: {
    name: 'Diners Club',
    prefixes: ['300', '301', '302', '303', '304', '305', '36', '38'],
    length: 14,
    cvvLength: 3
  }
};

// ------------------------------------------------------------
// 各国特定BIN前缀
// ------------------------------------------------------------
export const COUNTRY_BINS = {
  india: {
    name: '印度',
    bins: ['400551', '400552', '411146', '421824', '431940', '438628', '450661', '451006', '458736', '459025', '468805', '486489', '510126', '524156', '526422', '532306', '540109']
  },
  usa: {
    name: '美国',
    bins: ['400000', '411111', '424242', '436666', '450101', '453211', '471500', '489651', '510510', '517805', '524364', '530000', '545454', '552626']
  },
  uk: {
    name: '英国',
    bins: ['400001', '411112', '454313', '453978', '490301', '491656', '510127', '529305', '544887', '552188']
  },
  china: {
    name: '中国',
    bins: ['621234', '622848', '622849', '622850', '622851', '625000', '625001', '625002', '628200', '628201']
  },
  japan: {
    name: '日本',
    bins: ['352800', '354100', '356600', '358000', '400002', '411113', '458565', '476012', '510128', '545001']
  },
  germany: {
    name: '德国',
    bins: ['400003', '411114', '450102', '492165', '510129', '518702', '529500', '545002', '553301']
  },
  france: {
    name: '法国',
    bins: ['400004', '411115', '450103', '474386', '510130', '518703', '545003', '555566']
  },
  canada: {
    name: '加拿大',
    bins: ['400005', '411116', '450104', '455700', '471800', '510131', '518704', '545004']
  },
  australia: {
    name: '澳大利亚',
    bins: ['400006', '411117', '450105', '456789', '510132', '518705', '529501', '545005']
  },
  brazil: {
    name: '巴西',
    bins: ['400007', '411118', '450106', '457393', '510133', '518706', '545006']
  },
  russia: {
    name: '俄罗斯',
    bins: ['400008', '411119', '450107', '474746', '510134', '518707', '545007']
  },
  singapore: {
    name: '新加坡',
    bins: ['400009', '411120', '450108', '456123', '510135', '518708', '545008']
  },
  korea: {
    name: '韩国',
    bins: ['400010', '411121', '450109', '457891', '510136', '518709', '545009']
  },
  thailand: {
    name: '泰国',
    bins: ['400011', '411122', '450110', '458901', '510137', '518710', '545010']
  },
  malaysia: {
    name: '马来西亚',
    bins: ['400012', '411123', '450111', '459012', '510138', '518711', '545011']
  },
  indonesia: {
    name: '印度尼西亚',
    bins: ['400013', '411124', '450112', '459123', '510139', '518712', '545012']
  },
  philippines: {
    name: '菲律宾',
    bins: ['400014', '411125', '450113', '459234', '510140', '518713', '545013']
  },
  vietnam: {
    name: '越南',
    bins: ['400015', '411126', '450114', '459345', '510141', '518714', '545014']
  },
  mexico: {
    name: '墨西哥',
    bins: ['400016', '411127', '450115', '459456', '510142', '518715', '545015']
  },
  argentina: {
    name: '阿根廷',
    bins: ['400017', '411128', '450116', '459567', '510143', '518716', '545016']
  }
};

// ------------------------------------------------------------
// Luhn算法 - 验证信用卡号有效性
// ------------------------------------------------------------
export function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// ------------------------------------------------------------
// 计算Luhn校验位
// ------------------------------------------------------------
export function calculateLuhnCheckDigit(partialNumber) {
  const digits = partialNumber.split('').map(Number);
  let sum = 0;
  let isEven = true;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (10 - (sum % 10)) % 10;
}

// ------------------------------------------------------------
// 生成随机数字字符串
// ------------------------------------------------------------
function generateRandomDigits(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

// ------------------------------------------------------------
// 生成单个信用卡号
// ------------------------------------------------------------
export function generateCardNumber(cardType = 'visa', country = null) {
  let prefix;
  let length;

  // 如果指定了国家，使用国家特定的BIN
  if (country && COUNTRY_BINS[country]) {
    const countryBins = COUNTRY_BINS[country].bins;
    prefix = countryBins[Math.floor(Math.random() * countryBins.length)];
    length = 16;
  } else {
    // 否则使用卡类型的标准前缀
    const cardInfo = BIN_DATABASE[cardType] || BIN_DATABASE.visa;
    const prefixes = cardInfo.prefixes;
    prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    length = cardInfo.length;
  }

  // 生成除校验位外的所有数字
  const remainingLength = length - prefix.length - 1;
  const partialNumber = prefix + generateRandomDigits(remainingLength);

  // 计算并添加校验位
  const checkDigit = calculateLuhnCheckDigit(partialNumber);
  return partialNumber + checkDigit;
}

// ------------------------------------------------------------
// 生成CVV
// ------------------------------------------------------------
export function generateCVV(cardType = 'visa') {
  const cardInfo = BIN_DATABASE[cardType] || BIN_DATABASE.visa;
  const cvvLength = cardInfo.cvvLength;
  return generateRandomDigits(cvvLength);
}

// ------------------------------------------------------------
// 生成过期日期
// ------------------------------------------------------------
export function generateExpiryDate(yearsAhead = 5) {
  const now = new Date();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = now.getFullYear() + Math.floor(Math.random() * yearsAhead) + 1;
  
  return {
    month: month.toString().padStart(2, '0'),
    year: year.toString().slice(-2),
    fullYear: year.toString()
  };
}

// ------------------------------------------------------------
// 生成完整的信用卡信息
// ------------------------------------------------------------
export function generateFullCard(cardType = 'visa', country = null) {
  const cardNumber = generateCardNumber(cardType, country);
  const cvv = generateCVV(cardType);
  const expiry = generateExpiryDate();
  
  // 识别卡类型
  let detectedType = 'Unknown';
  for (const [type, info] of Object.entries(BIN_DATABASE)) {
    for (const prefix of info.prefixes) {
      if (cardNumber.startsWith(prefix)) {
        detectedType = info.name;
        break;
      }
    }
  }

  return {
    cardNumber,
    cvv,
    expiryMonth: expiry.month,
    expiryYear: expiry.year,
    expiryFull: `${expiry.month}/${expiry.year}`,
    cardType: detectedType,
    country: country ? COUNTRY_BINS[country]?.name : null,
    isValid: luhnCheck(cardNumber),
    bin: cardNumber.substring(0, 6)
  };
}

// ------------------------------------------------------------
// 批量生成信用卡
// ------------------------------------------------------------
export function generateMultipleCards(count, cardType = 'visa', country = null) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateFullCard(cardType, country));
  }
  return cards;
}

// ------------------------------------------------------------
// 格式化卡号显示
// ------------------------------------------------------------
export function formatCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

// ------------------------------------------------------------
// 根据自定义BIN生成卡号（参考namso-gen.com的Advance模式）
// 支持BIN格式：453590 或 453590xxxxxxxxxx
// ------------------------------------------------------------
export function generateCardFromBIN(bin, options = {}) {
  const { 
    expiryMonth = null, 
    expiryYear = null, 
    cvv = null,
    quantity = 1 
  } = options;
  
  // 清理BIN，移除x和非数字字符
  const cleanBin = bin.replace(/[xX]/g, '').replace(/\D/g, '');
  
  if (cleanBin.length < 6) {
    throw new Error('BIN必须至少6位数字');
  }
  
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    // 生成卡号（16位）
    const remainingLength = 16 - cleanBin.length - 1;
    const partialNumber = cleanBin + generateRandomDigits(remainingLength);
    const checkDigit = calculateLuhnCheckDigit(partialNumber);
    const cardNumber = partialNumber + checkDigit;
    
    // 生成过期日期
    let expMonth, expYear;
    if (expiryMonth && expiryMonth !== 'random') {
      expMonth = expiryMonth.toString().padStart(2, '0');
    } else {
      expMonth = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    }
    
    if (expiryYear && expiryYear !== 'random') {
      expYear = expiryYear.toString().slice(-2);
    } else {
      const currentYear = new Date().getFullYear();
      expYear = (currentYear + Math.floor(Math.random() * 5) + 1).toString().slice(-2);
    }
    
    // 生成CVV
    const cardCvv = cvv || generateRandomDigits(3);
    
    // 检测卡类型
    let cardType = 'Unknown';
    for (const [type, info] of Object.entries(BIN_DATABASE)) {
      for (const prefix of info.prefixes) {
        if (cardNumber.startsWith(prefix)) {
          cardType = info.name;
          break;
        }
      }
    }
    
    cards.push({
      cardNumber,
      cvv: cardCvv,
      expiryMonth: expMonth,
      expiryYear: expYear,
      expiryFull: `${expMonth}/${expYear}`,
      cardType,
      bin: cleanBin,
      isValid: luhnCheck(cardNumber)
    });
  }
  
  return quantity === 1 ? cards[0] : cards;
}

// ------------------------------------------------------------
// 多种输出格式支持（参考namso-gen.com）
// ------------------------------------------------------------
// 转义SQL字符串中的单引号，防止SQL注入
function escapeSqlValue(value) {
  return String(value).replace(/'/g, "''");
}

export function formatCardOutput(card, format = 'PIPE') {
  const { cardNumber, expiryMonth, expiryYear, cvv } = card;
  
  switch (format.toUpperCase()) {
    case 'PIPE':
      // 格式：卡号|月|年|CVV
      return `${cardNumber}|${expiryMonth}|20${expiryYear}|${cvv}`;
    
    case 'CSV':
      return `${cardNumber},${expiryMonth},20${expiryYear},${cvv}`;
    
    case 'JSON':
      return JSON.stringify({
        card_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: `20${expiryYear}`,
        cvv: cvv
      });
    
    case 'XML':
      return `<card>
  <number>${cardNumber}</number>
  <expiry_month>${expiryMonth}</expiry_month>
  <expiry_year>20${expiryYear}</expiry_year>
  <cvv>${cvv}</cvv>
</card>`;
    
    case 'SQL':
      return `INSERT INTO cards (card_number, expiry_month, expiry_year, cvv) VALUES ('${escapeSqlValue(cardNumber)}', '${escapeSqlValue(expiryMonth)}', '20${escapeSqlValue(expiryYear)}', '${escapeSqlValue(cvv)}');`;
    
    case 'CARD':
    default:
      // 格式化显示
      return `${formatCardNumber(cardNumber)} | ${expiryMonth}/${expiryYear} | ${cvv}`;
  }
}

// ------------------------------------------------------------
// 批量格式化输出
// ------------------------------------------------------------
export function formatMultipleCards(cards, format = 'PIPE') {
  return cards.map(card => formatCardOutput(card, format)).join('\n');
}

// ------------------------------------------------------------
// 获取支持的卡类型列表
// ------------------------------------------------------------
export function getSupportedCardTypes() {
  return Object.entries(BIN_DATABASE).map(([key, value]) => ({
    code: key,
    name: value.name,
    length: value.length,
    cvvLength: value.cvvLength
  }));
}

// ------------------------------------------------------------
// 获取支持的国家列表
// ------------------------------------------------------------
export function getSupportedCountries() {
  return Object.entries(COUNTRY_BINS).map(([key, value]) => ({
    code: key,
    name: value.name,
    binCount: value.bins.length
  }));
}

// ------------------------------------------------------------
// 获取输出格式列表
// ------------------------------------------------------------
export function getOutputFormats() {
  return [
    { code: 'CARD', name: '卡片格式', description: '格式化显示' },
    { code: 'PIPE', name: '管道分隔', description: '卡号|月|年|CVV' },
    { code: 'CSV', name: 'CSV格式', description: '逗号分隔' },
    { code: 'JSON', name: 'JSON格式', description: 'JSON对象' },
    { code: 'XML', name: 'XML格式', description: 'XML标签' },
    { code: 'SQL', name: 'SQL格式', description: 'INSERT语句' }
  ];
}

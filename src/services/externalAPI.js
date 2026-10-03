// ============================================================
// 外部API调用服务
// 直接调用第三方网站接口
// ============================================================

// ------------------------------------------------------------
// BIN验证服务 - 调用bincheck.io
// ------------------------------------------------------------
export async function checkBIN(bin) {
  try {
    const response = await fetch(`https://bincheck.io/details/${bin}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('BIN查询失败');
    }
    
    // 解析返回的HTML或JSON
    const text = await response.text();
    return {
      success: true,
      bin: bin,
      raw: text
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// ------------------------------------------------------------
// 信用卡验证服务 - 调用chkr.cc API
// 格式：卡号|月|年|CVV
// ------------------------------------------------------------
export async function validateCard(cardData) {
  // 安全修复：禁止将完整卡号/有效期/CVV发送至未经安全评估的第三方接口（chkr.cc）。
  // 该接口缺乏数据处理协议、传输加密控制与安全可见性，直接外发会暴露完整支付卡数据。
  return {
    success: false,
    error: 'Card validation via third-party API is disabled: sending full card data (PAN/CVV) to an unvetted external service is not permitted.',
    status: 'Unknown'
  };
}

// ------------------------------------------------------------
// 批量验证信用卡
// ------------------------------------------------------------
export async function validateMultipleCards(cardDataArray) {
  const results = {
    live: [],
    die: [],
    unknown: []
  };
  
  for (const cardData of cardDataArray) {
    const result = await validateCard(cardData);
    
    if (result.status === 'Live') {
      results.live.push({ data: cardData, ...result });
    } else if (result.status === 'Die') {
      results.die.push({ data: cardData, ...result });
    } else {
      results.unknown.push({ data: cardData, ...result });
    }
    
    // 避免请求过快被限制
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
}

// ------------------------------------------------------------
// 获取身份信息 - 调用addresschina.github.io
// 支持的国家路径
// ------------------------------------------------------------
export const IDENTITY_COUNTRIES = {
  china: { name: '中国', path: '/' },
  usa: { name: '美国', path: '/america-address/' },
  uk: { name: '英国', path: '/united-kingdom-address/' },
  japan: { name: '日本', path: '/japan-address/' },
  korea: { name: '韩国', path: '/korea-address/' },
  india: { name: '印度', path: '/india-address/' },
  germany: { name: '德国', path: '/germany-address/' },
  france: { name: '法国', path: '/france-address/' },
  canada: { name: '加拿大', path: '/canada-address/' },
  australia: { name: '澳大利亚', path: '/australia-address/' },
  brazil: { name: '巴西', path: '/brazil-address/' },
  russia: { name: '俄罗斯', path: '/russia-address/' },
  singapore: { name: '新加坡', path: '/singapore-address/' },
  thailand: { name: '泰国', path: '/thailand-address/' },
  malaysia: { name: '马来西亚', path: '/malaysia-address/' },
  vietnam: { name: '越南', path: '/vietnam-address/' },
  indonesia: { name: '印度尼西亚', path: '/indonesia-address/' },
  philippines: { name: '菲律宾', path: '/philippines-address/' },
  mexico: { name: '墨西哥', path: '/mexico-address/' },
  argentina: { name: '阿根廷', path: '/argentina-address/' },
  egypt: { name: '埃及', path: '/egypt-address/' },
  austria: { name: '奥地利', path: '/austria-address/' },
  netherlands: { name: '荷兰', path: '/netherlands-address/' },
  newzealand: { name: '新西兰', path: '/new-zealand-address/' },
  italy: { name: '意大利', path: '/italy-address/' },
  spain: { name: '西班牙', path: '/spain-address/' },
  portugal: { name: '葡萄牙', path: '/portugal-address/' },
  sweden: { name: '瑞典', path: '/sweden-address/' },
  norway: { name: '挪威', path: '/norway-address/' },
  switzerland: { name: '瑞士', path: '/switzerland-address/' },
  turkey: { name: '土耳其', path: '/turkey-address/' },
  iran: { name: '伊朗', path: '/iran-address/' }
};

// ------------------------------------------------------------
// 获取身份信息页面URL
// ------------------------------------------------------------
export function getIdentityURL(country = 'china') {
  const countryInfo = IDENTITY_COUNTRIES[country] || IDENTITY_COUNTRIES.china;
  return `https://addresschina.github.io${countryInfo.path}`;
}

// ------------------------------------------------------------
// 验证网站配置
// ------------------------------------------------------------
export const VALIDATOR_SITES = {
  bincheck: {
    name: 'BinCheck.io',
    url: 'https://bincheck.io/zh',
    description: 'BIN信息查询，支持查看卡类型、发卡行、国家等',
    type: 'bin'
  },
  chkr: {
    name: 'Chkr.cc',
    url: 'https://chkr.cc/',
    api: 'https://api.chkr.cc/',
    description: '信用卡Live/Die验证',
    type: 'validate'
  },
  payate: {
    name: 'Payate Mock',
    url: 'https://mock.payate.com/',
    description: '模拟验证服务',
    type: 'validate'
  }
};

// ------------------------------------------------------------
// 生成网站配置
// ------------------------------------------------------------
export const GENERATOR_SITES = {
  namso: {
    name: 'Namso Gen',
    url: 'https://namso-gen.com/',
    description: '信用卡号生成器，支持多种卡类型和输出格式',
    features: ['自定义BIN', '批量生成', '多种输出格式']
  },
  addresschina: {
    name: 'Address China',
    url: 'https://addresschina.github.io/',
    description: '全球虚拟身份信息生成器',
    features: ['多国支持', '完整身份信息', '包含信用卡']
  }
};

// ------------------------------------------------------------
// 在新窗口打开网站
// ------------------------------------------------------------
export function openExternalSite(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ------------------------------------------------------------
// 打开身份生成页面
// ------------------------------------------------------------
export function openIdentityGenerator(country = 'china') {
  const url = getIdentityURL(country);
  openExternalSite(url);
}

// ------------------------------------------------------------
// 打开BIN验证页面
// ------------------------------------------------------------
export function openBINChecker(bin = '') {
  const url = bin 
    ? `https://bincheck.io/zh/details/${bin}` 
    : 'https://bincheck.io/zh';
  openExternalSite(url);
}

// ------------------------------------------------------------
// 打开卡号验证页面
// ------------------------------------------------------------
export function openCardValidator(site = 'chkr') {
  const siteConfig = VALIDATOR_SITES[site];
  if (siteConfig) {
    openExternalSite(siteConfig.url);
  }
}

// ------------------------------------------------------------
// 打开卡号生成页面
// ------------------------------------------------------------
export function openCardGenerator(bin = '') {
  const url = bin 
    ? `https://namso-gen.com/?tab=advance&bin=${bin}` 
    : 'https://namso-gen.com/';
  openExternalSite(url);
}

// ------------------------------------------------------------
// 复制到剪贴板
// ------------------------------------------------------------
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

// ------------------------------------------------------------
// 格式化卡号为验证格式
// ------------------------------------------------------------
export function formatCardForValidation(cardNumber, month, year, cvv) {
  return `${cardNumber}|${month}|${year}|${cvv}`;
}

// ------------------------------------------------------------
// 解析验证格式的卡号
// ------------------------------------------------------------
export function parseCardFromValidation(cardString) {
  const parts = cardString.split('|');
  if (parts.length >= 4) {
    return {
      cardNumber: parts[0],
      month: parts[1],
      year: parts[2],
      cvv: parts[3]
    };
  }
  return null;
}

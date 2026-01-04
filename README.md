<div align="center">

# 💳 CK Card Tools

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-violet?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.2.5-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
</p>

<p align="center">
  <strong>🚀 Professional Virtual Card Generator & Validator</strong>
</p>

<p align="center">
  <a href="https://ck-card-tools.vercel.app">🌐 Live Demo (Vercel)</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#-installation">📦 Install</a> •
  <a href="#-screenshots">📸 Screenshots</a> •
  <a href="#-contact">📬 Contact</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🌍_i18n-中文_|_English-fuchsia?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/Theme-Violet_Gradient-8B5CF6?style=flat-square" alt="Theme" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

**[English](#-english)** | **[中文](#-中文)**

</div>

---

## 🇺🇸 English

### 📖 Overview

A professional-grade credit card generator and validator built with React 19 and modern web technologies. Features a stunning **violet/fuchsia gradient theme** with **bilingual support (English/Chinese)**.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 💳 **Card Generation** | Generate valid test credit card numbers using Luhn algorithm |
| 🏦 **Multiple Card Types** | Visa, MasterCard, AmEx, Discover, UnionPay, JCB, Maestro, Diners |
| 🔢 **Custom BIN** | Generate cards with specific BIN prefixes (6-8 digits) |
| 🌍 **20+ Countries** | Country-specific BIN generation |
| 📄 **5 Output Formats** | PIPE, CSV, JSON, XML, SQL |
| 👤 **Identity Generator** | Complete fake identities for 15+ countries |
| 🌐 **Bilingual UI** | Switch between English and Chinese |
| 🎨 **Modern Design** | Violet/fuchsia gradient theme with glow effects |

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/1837620622/Credit-Card-Generator-and-Validator.git

# Navigate to project directory
cd Credit-Card-Generator-and-Validator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🚀 Quick Start

1. **Generator** - Select card type, country, quantity → Click "Generate"
2. **Copy** - Click "Copy All" or hover individual cards
3. **Validate** - Use external BIN checker links
4. **Identity** - Generate fake identities by country
5. **Language** - Toggle EN/中文 in top right

### 🛠 Tech Stack

```
React 19      →  Frontend Framework
Vite 7        →  Build Tool (Rolldown)
TailwindCSS 4 →  Styling
Lucide        →  Icons
Railway       →  Deployment
```

### 📁 Project Structure

```
📦 CK-Card-Tools
├── 📂 src/
│   ├── 📄 App.jsx              # Main component + i18n
│   ├── 📄 index.css            # Global styles
│   ├── 📄 main.jsx             # Entry point
│   ├── 📂 services/
│   │   └── 📄 externalAPI.js   # External APIs
│   └── 📂 utils/
│       ├── 📄 cardGenerator.js    # Card generation
│       └── 📄 identityGenerator.js # Identity generation
├── 📄 railway.json             # Railway config
└── 📄 package.json
```

---

## 🇨🇳 中文

### 📖 概述

基于 React 19 构建的专业信用卡生成器与验证器。采用**紫色/品红渐变主题**设计，支持**中英文双语**切换。

### ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 💳 **卡号生成** | 使用 Luhn 算法生成有效测试卡号 |
| 🏦 **多种卡类型** | Visa、万事达、运通、Discover、银联、JCB、Maestro、大来卡 |
| 🔢 **自定义 BIN** | 支持 6-8 位 BIN 前缀生成 |
| 🌍 **20+ 国家** | 国家特定 BIN 生成 |
| 📄 **5 种格式** | PIPE、CSV、JSON、XML、SQL |
| 👤 **身份生成** | 15+ 国家完整虚假身份 |
| 🌐 **双语界面** | 中英文一键切换 |
| 🎨 **现代设计** | 紫色渐变主题 + 发光效果 |

### 📦 安装部署

```bash
# 克隆仓库
git clone https://github.com/1837620622/Credit-Card-Generator-and-Validator.git

# 进入目录
cd Credit-Card-Generator-and-Validator

# 安装依赖
npm install

# 启动开发
npm run dev

# 构建生产版本
npm run build
```

### 🚀 快速使用

1. **生成器** - 选择卡类型、国家、数量 → 点击"生成"
2. **复制** - 点击"复制全部"或悬停单张卡片
3. **验证** - 使用外部 BIN 查询链接
4. **身份** - 按国家生成虚假身份
5. **语言** - 右上角切换 EN/中文

### 🛠 技术栈

```
React 19      →  前端框架
Vite 7        →  构建工具 (Rolldown)
TailwindCSS 4 →  样式框架
Lucide        →  图标库
Railway       →  部署平台
```

---

<div align="center">

### ⚠️ Disclaimer / 免责声明

<table>
<tr>
<td>🇺🇸</td>
<td><strong>This tool is for educational and testing purposes only.</strong><br/>Do not use generated card numbers for any illegal activities.</td>
</tr>
<tr>
<td>🇨🇳</td>
<td><strong>本工具仅供学习和测试使用。</strong><br/>请勿将生成的卡号用于任何非法活动。</td>
</tr>
</table>

---

### 📬 Contact / 联系方式

<p align="center">
  <a href="https://github.com/1837620622"><img src="https://img.shields.io/badge/GitHub-1837620622-181717?style=for-the-badge&logo=github" alt="GitHub" /></a>
  <a href="mailto:2040168455@qq.com"><img src="https://img.shields.io/badge/Email-2040168455@qq.com-EA4335?style=for-the-badge&logo=gmail" alt="Email" /></a>
</p>

| Platform | Contact |
|----------|---------|
| 💬 **WeChat** | 1837620622 |
| 👤 **Author** | 传康kk |
| 📺 **Bilibili** | 万能程序员 |
| 🐟 **Xianyu** | 万能程序员 |

---

### 🌟 Star History

如果这个项目对你有帮助，请给一个 ⭐ Star！

If this project helps you, please give it a ⭐ Star!

---

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-❤️-ff69b4?style=for-the-badge" alt="Made with love" />
  <img src="https://img.shields.io/badge/by-传康kk-8B5CF6?style=for-the-badge" alt="by 传康kk" />
</p>

<p align="center">
  <sub>© 2026 CK Card Tools. All rights reserved.</sub>
</p>

</div>

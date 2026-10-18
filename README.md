# VK MBBS Question Bank - Ultimate Topper Edition 🩺

A modern, offline-ready Progressive Web Application (PWA) designed for MBBS medical students across all 4 years. Features university exam question papers, 2-mark, 5-mark, and 10-mark gold standard answer blueprints, diagram guidelines, clinical mnemonics, and timed quiz spotters.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvinokum-VK%2Fvk-MBBS-Question-Bank)

## 🚀 Features

- **All 4 MBBS Curriculum Years**:
  - **1st Year (Pre-Clinical)**: Human Anatomy, Physiology, Biochemistry.
  - **2nd Year (Para-Clinical)**: Pathology, Pharmacology, Microbiology, FMT.
  - **3rd Year (Part 1)**: Community Medicine (PSM), Ophthalmology, ENT.
  - **Final Year (Part 2)**: General Medicine, General Surgery, OBGYN, Paediatrics.
- **Examiner-Ready Blueprints**:
  - **2-Mark Notes**: Definitions, key points, and clinical pearls.
  - **5-Mark Answers**: Etiology, clinical features, and evaluation tips.
  - **10-Mark Gold Standard Essays**: Step-by-step headings, investigation workup, emergency/medical/surgical management, and diagram checklists.
- **Multi-Platform Native Experience**:
  - **Windows PC**: Installs as a standalone desktop app via Chrome/Edge.
  - **Apple iOS / Mac**: Safari Add to Home Screen PWA.
  - **Android**: WebAPK compliance with full offline caching.
- **Rapid Clinical Quiz Simulator**: Interactive MCQs with immediate explanations and high-yield exam pearls.
- **Print & PDF Support**: Built-in print stylesheets for generating clean offline exam revision sheets.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **PWA**: `vite-plugin-pwa` with Service Worker precaching
- **Deployment**: Zero-config Vercel configuration (`vercel.json`)

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deploy to Vercel

```bash
npx vercel --prod
```

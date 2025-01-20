# Redux 설치하기

```bash
pnpm add redux react-redux @reduxjs/toolkit
pnpm add -D redux-devtools
```

# React Base Template 설치 방법

기본 템플릿의 스택

- React
- TypeScript
- TailwindCSS
- Vite

# 1. 프로젝트 설치

```bash
pnpm create vite react-base-template --template react-ts
```

# 2. Prettier 설정

```bash
pnpm add -D prettier
```

# 3. TailwindCSS 설정

```bash
pnpm install -D tailwindcss postcss autoprefixer
```

## 3.1. TailwindCSS 설정파일 생성

명령어 실행

```bash
npx tailwindcss init
```

아래 내용 입력

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 3.2. PostCSS 설정파일 생성

명령어 실행

```bash
touch postcss.config.js
```

아래 내용 입력

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 3.3. 최상단 css파일에 아래 내용 추가

index.css에 추가한다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

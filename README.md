# playwright_assessment_task_distribution

This project provides a boilerplate setup for **Playwright + TypeScript + Page Object Model (POM)** to automate end-to-end UI tests for the [Aerobus](https://www.aerobus.fr/) web interface.

---

## Project Structure

```
project/
 ├─ pages/                  
 ├─ tests/                 
 ├─ fixtures/               
 ├─ config/                 
 ├─ .github/workflows/      
 ├─ playwright.config.ts
 ├─ tsconfig.json
 ├─ package.json
 └─ README.md
```

---

## Getting Started

### Install dependencies

```
npm install
```

### Install browsers

```
npx playwright install
```

### Run tests

```
npx playwright test
```

### Run in headed mode

```
npx playwright test --headed
```







If you need Docker support, visual regression, or additional environments (staging, QA, pre-prod), I can extend the boilerplate further.

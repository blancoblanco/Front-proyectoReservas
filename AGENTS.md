# AGENTS.md - Agent Coding Guidelines

This file provides guidelines for agentic coding agents working in this repository.

## Project Overview

- **Framework**: React 18.2 with Vite
- **Language**: JavaScript (JSX)
- **Package Manager**: npm
- **Key Dependencies**: axios, react-router-dom, react-hook-form, js-cookie

## 1. Build / Lint / Test Commands  

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on src/ (max-warnings 0)

# Testing (requires Vitest setup - see below)
npx vitest run                       # Run all tests once
npx vitest run --testNamePattern=""  # Run tests matching pattern
npx vitest --watch                   # Watch mode
```

### Test Framework Setup (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`: `"test": "vitest", "test:run": "vitest run"`

Create `vitest.config.js`:
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.js' },
})
```

Create `src/test/setup.js`: `import '@testing-library/jest-dom'`

## 2. Code Style Guidelines

### ESLint Configuration (`.eslintrc.cjs`)
- Extends: `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`
- Rule: `react-refresh/only-export-components`: warn

### General Style
- **Language**: JavaScript ES2020+
- **Components**: Functional only (no class components)
- **React**: 18.2 with automatic JSX runtime

### Import Order
1. React/External (`react`, `react-router-dom`)
2. Internal (components, hooks from `./` or `../`)
3. CSS/Styles

### File Naming Conventions
Components: PascalCase | Hooks: use prefix | Utilities: camelCase | Context: PascalCase + Context

### Component Structure

```jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SomeComponent from './SomeComponent'
import './ComponentName.css'

function ComponentName({ prop1, prop2 = 0 }) {
  const [state, setState] = useState(initialValue)

  useEffect(() => { return () => cleanup() }, [dependencies])

  const handleAction = () => {}

  return <div className="component-name">{/* JSX */}</div>
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
}

export default ComponentName
```

### Naming Conventions
Variables/Functions: camelCase | Constants: UPPER_SNAKE_CASE | Components: PascalCase | Booleans: is/has/can/should

### Error Handling
- Use try/catch for async operations
- Provide user-friendly error messages
- Handle API errors with proper status codes

```javascript
const fetchData = async () => {
  try {
    const response = await axios.get('/api/resource')
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      navigate('/login')
    } else {
      console.error('Error fetching data:', error)
      setError('Failed to load data. Please try again.')
    }
  }
}
```

### React Hooks Best Practices
- Always include dependencies in useEffect dependency arrays
- Use custom hooks to extract reusable logic
- Use `useCallback` for functions passed as props
- Use `useMemo` for expensive calculations

## 3. Project Structure

```
src/
├── api/              # API service functions
├── components/       # Reusable UI components
├── context/          # React Context providers
├── css/              # Global stylesheets
├── pages/            # Page-level components (routes)
├── test/             # Test files (after Vitest setup)
├── App.jsx           # Main app with routing
├── main.jsx          # Entry point
└── ProtectedRoute.jsx # Auth guard for routes
```

### Key Files

- `main.jsx`: React 18 root with StrictMode
- `App.jsx`: Router setup and global layout
- `ProtectedRoute.jsx`: Authentication guard

## 4. Important Notes

- **No TypeScript**: Use PropTypes for type checking
- **No built-in tests**: Vitest can be added following section 1
- **API Base URL**: Configure in `api/` folder
- **Authentication**: Uses js-cookie for token storage; AuthContext in `context/`

## 5. Common Tasks

### Adding a new page
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Wrap with ProtectedRoute if needed

### Adding a new API endpoint
1. Create/extend service in `src/api/`
2. Use existing axios instance or create new one
3. Handle errors consistently

### Adding a new component
1. Create in appropriate folder under `src/components/`
2. Export component
3. Import and use in parent

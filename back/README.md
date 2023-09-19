
---

# AREA Project - Backend

The goal of this project is to discover, as a whole, the software platform that you have chosen through the
creation of a business application.  
To do this, you must implement a software suite that functions similar to that of IFTTT and/or Zapier.

## Features

- **TypeScript**: Bringing strong typing and modern JavaScript features.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript.
- **Prettier**: Opinionated code formatter for consistent code.

## Prerequisites

- Node.js >= 14.x
- npm >= 6.x

## Getting Started

1. **Clone the Repository**

    ```bash
    git clone https://github.com/EpitechPromo2026/B-DEV-500-LYN-5-1-area-timothe.medico
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Running in development mode**

    ```bash
    npm run dev
    ```

   This will start the development server using `nodemon` which watches for changes in the TypeScript files.  
  

4. **Build and run in production**

   First, compile the TypeScript files:

    ```bash
    npm run build
    ```

   Then, start the server:

    ```bash
    npm start
    ```

## Project Structure

```
.
|-- src/
|   |-- app.ts           # App entry point
|-- .eslintrc.json       # ESLint configuration
|-- tsconfig.json        # TypeScript compiler configuration
|-- package.json         # Node.js dependencies and scripts
|-- README.md
```

## Environment Variables

The application uses the following environment variables:

- `PORT`: Port number to run the Express server (default: `3000`)

---

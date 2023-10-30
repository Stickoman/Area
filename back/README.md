
---

# AREA Project - Backend

The goal of this project is to discover, as a whole, the software platform that you have chosen through the
creation of a business application.  
To do this, you must implement a software suite that functions similar to that of IFTTT and/or Zapier.

## Features

- **TypeScript**: Bringing strong typing and modern JavaScript features.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript.

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

3. **Available Scripts**

 - `npm start`: Build and start the application.
 - `npm run dev`: Start the application in development mode with hot reloading using nodemon.
 - `npm run lint`: Lint the TypeScript files in the project using ESLint.
 - `npm run test`: Run unit tests with Jest.
 - `npm run doc`: Generate a graph of your application's dependencies in an image format.

## Project Structure

```
.
|-- __tests__/           # Routes integrations tests
|-- doc/                 # Project documentation
|-- src/
    |-- app.ts           # Express server
|   |-- index.ts         # Application entry point
|-- .eslintrc.json       # ESLint configuration
|-- Dockerfile           # Server image definition
|-- package.json         # Node.js dependencies and scripts
|-- README.md            # :)
|-- tsconfig.json        # TypeScript compiler configuration
```

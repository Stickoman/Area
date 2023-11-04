# AREA Project Frontend

Welcome to the frontend of the AREA project! This part of the project provides the user interface for creating and managing automation workflows. It complements the backend project to offer a comprehensive automation platform.

## Prerequisites

Before getting started with the frontend, make sure you have the following software and dependencies installed on your system:

- Node.js (required for running and building the project)

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-frontend-repo-url
```

2. **Install Frontend Dependencies**

```bash
npm install
```

## Available Scripts

- `npm start`: Start the development server for the frontend (PORT 8081).
- `npm run build`: Build the production-ready version of the frontend.
- `npm run build-cordova`: Build the frontend for Cordova.
- `npm run web`: Serve the production build locally.
- `npm run lint`: Run ESLint for linting TypeScript and TypeScript/React files.

## Project Structure

.
|-- src/ # Source code for the frontend application
|-- public/ # Static assets and HTML template
|-- .eslintrc.js # ESLint configuration
|-- package.json # Node.js dependencies and scripts
|-- README.md # This documentation

## Dependencies

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/): Declarative routing for React.
- [Axios](https://axios-http.com/): Promise-based HTTP client for making network requests.
- [React Notifications](https://www.npmjs.com/package/react-notifications): A simple and flexible notification component.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
- [Font Awesome](https://fontawesome.com/): Icons and SVGs for your web projects.

## Browsers Support

- Production: Modern browsers and a usage share of more than 0.2%.
- Development: The last version of Chrome, Firefox, and Safari.

## Cordova Support

This project includes support for building the frontend for Cordova, allowing you to create mobile applications.

- Platforms: Android (cordova-android 12.0.1)

For specific Cordova-related instructions, refer to the Cordova documentation.

## More Information

For more details and specific instructions on using the backend, please refer to the documentation and README provided in the [backend repository](https://github.com/EpitechPromo2026/B-DEV-500-LYN-5-1-area-timothe.medico/tree/main/back).

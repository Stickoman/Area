export const swagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AREA REST API',
      version: '1.0.0',
      description: 'The goal of this project is to implement a software suite that functions similar to that of IFTTT and/or Zapier.',
    },
  },
  apis: ['./src/routes/*.ts'],
};

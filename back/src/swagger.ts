export const swagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AREA REST API',
      version: '1.0.0',
      description: 'The goal of this project is to implement a software suite that functions similar to that of IFTTT and/or Zapier.',
    },
    servers: [
      {
        url: 'https://area.baragouin.fr/',
        description: 'Production server',
      },
      {
        url: 'http://localhost:8080/',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        AreaDetails: {
          type: 'object',
          properties: {
            actionType: {
              type: 'string',
              description: 'Type of action',
            },
            actionData: {
              type: 'object',
              description: 'Data associated with the action',
            },
            reactionType: {
              type: 'string',
              description: 'Type of reaction',
            },
            reactionData: {
              type: 'object',
              description: 'Data associated with the reaction',
            },
          },
        },
        Area: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID associated with the area',
            },
            actionType: {
              type: 'string',
              description: 'Type of action',
            },
            actionId: {
              type: 'string',
              description: 'Unique ID associated with the action',
            },
            reactionType: {
              type: 'string',
              description: 'Type of reaction',
            },
            reactionId: {
              type: 'string',
              description: 'Unique ID associated with the reaction',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/routes/**/*.ts'],
};

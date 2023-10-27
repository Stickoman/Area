import swaggerJsdoc from 'swagger-jsdoc';
import {swagger} from '../swagger';
import {isConnected} from '../mongodb';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const SWAGGER_SPECS = swaggerJsdoc(swagger);
const router = express.Router();

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Check if the server is running.
 *     tags:
 *      - Server status
 *     responses:
 *       200:
 *         description: The server is up and running.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Pong"
 */
router.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Check the status of the database connection.
 *     tags:
 *      - Server status
 *     responses:
 *       200:
 *         description: The database is successfully connected.
 *       500:
 *         description: There is an issue with the database connection.
 */
router.get('/api/status', (_req, res) => {
  res.sendStatus(isConnected() ? 200 : 500);
});

/**
 * @swagger
 * /api/mobile:
 *   get:
 *     summary: Download the mobile APK.
 *     tags:
 *      - Mobile client
 *     responses:
 *       200:
 *         description: Successfully returns the APK file for download.
 *         content:
 *           application/vnd.android.package-archive:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/api/mobile', (req, res) => {
  const file = '/usr/src/app/shared/client.apk';

  res.download(file);
});

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(SWAGGER_SPECS));

export {router as globalRouter};

import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';
import { postNew, getMe } from '../controllers/UsersController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = express.Router();

router.get('/status', getStatus);

router.get('/stats', getStats);

router.post('/users', postNew);

router.get('/connect', getConnect);

router.get('/disconnect', getDisconnect);

router.get('/users/me', getMe);

router.post('/files', FilesController.postUpload);

router.get('/files/:id', FilesController.getShow);

router.get('/files', FilesController.getIndex);

router.get('/files/:id/data', FilesController.getFile);

router.put('/files/:id/publish', FilesController.putPublish);

router.put('/files/:id/unpublish', FilesController.putUnpublish);

export default router;

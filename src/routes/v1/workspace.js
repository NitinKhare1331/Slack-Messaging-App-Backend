import express from 'express';

import { 
    createWorkspaceController, 
    deleteWorkspaceController, 
    getWorkspaceByJoinCodeController, 
    getWorkspaceController, 
    getWorkspacesUserIsMemberOfController 
} from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/', isAuthenticated, validate(createWorkspaceSchema), createWorkspaceController);

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController);

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

router.get('/:workspaceId', isAuthenticated, getWorkspaceController);

router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController);

export default router;
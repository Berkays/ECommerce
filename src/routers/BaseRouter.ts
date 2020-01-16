import { Router } from 'express';
import AuthRouter from './AuthRouter';
import ApiRouter from './ApiRouter';
import PageRouter from './PageRouter';

const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/graphql', ApiRouter);
router.use('/', PageRouter);

// Export base-router
export default router;

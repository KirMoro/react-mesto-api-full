import { Router } from 'express';
import {
  getUsers, getUserById, updateUserProfile, updateUserAvatar,
} from '../controllers/users.js';
import {
  celebrateAvatar, celebrateProfile, celebrateUserId,
} from '../validators/users.js';

export const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', celebrateUserId, getUserById);
userRoutes.patch('/me', celebrateProfile, updateUserProfile);
userRoutes.patch('/me/avatar', celebrateAvatar, updateUserAvatar);

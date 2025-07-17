import { ObjectId } from 'mongoose';
import { Rol } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId;
      userRol: Rol
    }
  }
}
import AuthController  from '@/Lib/Controllers/AuthController';
import { Application } from 'express';

export default function exampleRoute(app: Application): void {
  app.post('/', AuthController.Login);
}

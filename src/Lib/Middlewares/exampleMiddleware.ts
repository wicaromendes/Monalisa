import { Request, Response, NextFunction } from 'express';

function exampleMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Execute qualquer lógica do middleware aqui
  console.log('Example Middleware executado!');
  next();
}

export default exampleMiddleware;

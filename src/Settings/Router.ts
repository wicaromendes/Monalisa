import fs from 'fs';
import path from 'path';
import { Application } from 'express';

const routesPath = path.join(__dirname, '../Lib/Routes');

function Router(app: Application): void {
  const files = fs.readdirSync(routesPath);
  const activeRoutes: string[] = [];

  if (files.length === 0) {
    console.log('Nenhum arquivo encontrado na rota.');
    return;
  }

  files.forEach((file: string) => {
    const routePath = path.join(routesPath, file);
    const route = require(routePath).default;

    if (typeof route === 'function') {
      route(app);
      const routeName = path.basename(routePath);
      activeRoutes.push(routeName);
    } else {
      console.error(`Invalid route export in file: ${routePath}`);
    }
  });

  console.log('Rotas ativas:');
  activeRoutes.forEach((route) => {
    console.log(route);
  });
}

export default Router;

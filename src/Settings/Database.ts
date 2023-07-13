import { Sequelize, DataTypes } from 'sequelize';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import Settings from './Setting';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  SequelizeConnection = async () => {
    if (Settings.Database().active) {
      const connectionDatabase = new Sequelize(
        process.env.DATABASE_NAME!,
        process.env.DATABASE_USER!,
        process.env.DATABASE_PASSWORD! + '#',
        {
          host: process.env.DATABASE_HOST!,
          dialect: Settings.Database().dialect,
          logging: Settings.Database().logging,
        }
      );

      connectionDatabase
        .define("Session", {
          sid: { type: DataTypes.STRING, primaryKey: true },
          expires: DataTypes.DATE,
          data: DataTypes.TEXT,
        })
        .sync({ force: Settings.Database().forceSync });

      const extendDefaultFields = (defaults: any, session: any) => {
        return {
          data: defaults.data,
          expires: defaults.expires,
          userId: session.userId,
        };
      };

      connectionDatabase
        .authenticate()
        .then(() => {
          console.log("Database Connected!");
        })
        .catch((err) => {
          console.log("Database Error: " + err);
        });

      const SequelizeStoreInstance = SequelizeStore(session.Store);
      const store = new SequelizeStoreInstance({
        db: connectionDatabase,
        table: "Session",
        extendDefaultFields: extendDefaultFields,
        checkExpirationInterval: Settings.Database().checkExpiration,
        expiration: Settings.Database().expiration,
      });
    }
  };
}

export default new Database();

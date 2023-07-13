import Database from "@/Settings/Database";
import { ExpressConfiguration } from "@/Settings/Express";

const ExpressSystem = new ExpressConfiguration()

export class System{
    async Initialize(){
        ExpressSystem.App()
        ExpressSystem.startApp()
        Database.SequelizeConnection()
    }
}
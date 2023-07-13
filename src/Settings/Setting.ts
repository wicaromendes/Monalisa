class Settings {
    Database() {
      return {
        active: true,
        dialect: "mysql" as const, // Definindo o tipo como "mysql"
        logging: false,
        forceSync: true,
        checkExpiration: 15 * 60 * 1000,
        expiration: 7 * 24 * 60 * 60 * 1000,
      };
    }
  }
  
  export default new Settings();
  
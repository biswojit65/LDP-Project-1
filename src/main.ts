import { logger } from "./utils/logger";
import {migrate} from "drizzle-orm/node-postgres/migrator"
import { createServer } from "./utils/backend_server";
import { env } from "./config/env";
import { database } from "./database";

//Ensuring the server shuts down gracefully when receiving termination signals.
async function gracefulShutdown({app}: {app: Awaited<ReturnType<typeof createServer>>;}) {
    try {
      await app.close();
      logger.info("Server closed gracefully");
    } catch (err) {
      logger.error("Error during server shutdown", err);
    } finally {
      process.exit(0);
    }
}
  
async function main(){
    const app=await createServer();
    await app.listen({
        port: env.PORT,
        host: env.HOST,
    });
    logger.debug(env,"using environmental variables");//Logging a debug message including the environment variables 
    await migrate(database,{migrationsFolder:'./migration'}) //running database migrations
    const closeSignals=["SIGINT","SIGTERM"];// Defining system signals for graceful shutdown

    // Setting up listeners for the defined signals
    for(const signal of closeSignals){
        process.on(signal,()=>{
            gracefulShutdown({app})
        });
    }
      
}
main();
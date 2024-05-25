import { InferInsertModel ,eq} from "drizzle-orm";
import { applications, userdata } from "../../database/schema";
import { database } from "../../database";

//Inserting to "application" database
export async function createApplication(data:InferInsertModel<typeof applications>){
    const resultData=await database.insert(applications).values(data).returning();
    return resultData[0];
}

//Extracting available datas from "application" database
export async function getApplications() {
    const resultData = await database.select({
        id: applications.id,
        name: applications.name,
        createdAt: applications.createdAt,
    }).from(applications);
    return resultData;
}
//Extracting all user informations for a particular application
export async function getUsersByApplication(applicationId: string) {
    const result = await database.select().from(userdata).where(eq(userdata.applicationId, applicationId));
    return result;
}

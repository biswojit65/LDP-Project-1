import { InferInsertModel,and, eq } from "drizzle-orm";
import { database } from "../../database";
import { user_role } from "../../database/schema";

//Inserting role to "user_role" database
export async function createRole(data:InferInsertModel<typeof user_role>){
    const resultData=await database.insert(user_role).values(data).returning();
    return resultData[0];
}
//Getting role info giving name and applicationId as argument
export async function getRoleByName({name,applicationId}: {name: string;applicationId: string;}) {
    const result = await database.select().from(user_role).where(
      and(eq(user_role.name, name), eq(user_role.applicationId, applicationId))
    ).limit(1);
    return result[0];
}
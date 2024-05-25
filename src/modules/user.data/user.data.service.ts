import { InferInsertModel,eq,and } from "drizzle-orm";
import { userdata,applications, userAndRoles, user_role } from "../../database/schema";
import argon2 from "argon2";
import { database } from "../../database";

//Inserting new user data into "userdata" table
export async function createUser(data:InferInsertModel<typeof userdata>) {
    const hashedPassword = await argon2.hash(data.password);
    const result = await database.insert(userdata).values({...data,password: hashedPassword}).returning({
        id: userdata.id,
        email: userdata.email,
        name: userdata.name,
        applicationId: applications.id  
    });
    return result[0];
}

//Inserting user role data to "userAndRoles" table
export async function assignRoleTouser(data:InferInsertModel<typeof userAndRoles>) {
    const result = await database.insert(userAndRoles).values(data).returning();
    return result[0];
}

//Getting user information from email
export async function getUserByEmail({email,applicationId}: {email: string;applicationId: string;}){
    const result = await database.select({
        id: userdata.id,
        email: userdata.email,
        name: userdata.name,
        applicationId: userdata.applicationId,
        roleId: user_role.id,
        password: userdata.password,
        permissions: user_role.permissions,
      }).from(userdata).where(and(eq(userdata.email, email), eq(userdata.applicationId, applicationId)))
      .leftJoin(userAndRoles,and(
          eq(userAndRoles.userId, userdata.id),
          eq(userAndRoles.applicationId, userdata.applicationId)
        ))
      .leftJoin(user_role, eq(user_role.id, userAndRoles.roleId));
  
    if (!result.length) {return null;}
  
    const user = result.reduce((acc, curr) => {
      if (!acc.id) {
        return {
          ...curr,
          permissions: new Set(curr.permissions),
        };
      }
      if (!curr.permissions) {
        return acc;
      }
      for (const permission of curr.permissions) {
        acc.permissions.add(permission);
      }
      return acc;
    }, {} as Omit<(typeof result)[number], "permissions"> & { permissions: Set<string> });
  
    return {...user,permissions: Array.from(user.permissions)};
}
import {pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar} from 'drizzle-orm/pg-core';

//application table schema
export const applications = pgTable("applications", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//userdata table schema
export const userdata=pgTable('userdata',{
    id:uuid("id").defaultRandom().notNull(),
    name:varchar("name", { length: 256 }).notNull(),
    email:varchar("email", { length: 256 }).notNull(),
    applicationId:uuid("applicationId").references(()=>applications.id),
    password:varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
},(userdata)=>{return{
    cpk:  primaryKey({ columns: [userdata.email, userdata.applicationId] }),
    idIndex: uniqueIndex("userdata_id_index").on(userdata.id),
}})

//user_role table schema
export const user_role = pgTable("user_role",{
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    permissions: text("permissions").array().$type<Array<string>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (user_role) => {
    return {
      cpk: primaryKey({ columns: [user_role.name, user_role.applicationId] }),
      idIndex: uniqueIndex("user_role_id_index").on(user_role.id),
    };
  }
);

//userAndRoles table schema(Assigning roles to user)
export const userAndRoles = pgTable("userAndRoles",{
      applicationId: uuid("applicationId").references(() => applications.id).notNull(),
      roleId: uuid("roledId").references(() => user_role.id).notNull(),
      userId: uuid("userId").references(() => userdata.id).notNull(),
    },
    (userAndRoles) => {
      return {
        cpk: primaryKey({ columns: [userAndRoles.applicationId,userAndRoles.roleId,userAndRoles.userId] }),
      };
    }
);
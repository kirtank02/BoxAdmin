import type { CollectionConfig } from "payload";

export const User: CollectionConfig = {
   slug: "user",
   // admin: {
   //    useAsTitle: "name",
   // },
   fields: [
      {
         name: "id",
         type: "text",
         required: true,
         admin: {
            readOnly: true,
         },
      },
      {
         name: "name",
         type: "text",
         required: true,
      },
      {
         name: "email",
         type: "email",
         required: true,
         unique: true,
      },
      {
         name: "password_hash",
         type: "text",
         required: true,
      },
      {
         name: "phone",
         type: "text",
         required: true,
      },
      {
         name: "created_at",
         type: "date",
         required: true,
         admin: {
            readOnly: true,
         },
      },
   ],
};

import type { CollectionConfig } from "payload";

export const User: CollectionConfig = {
  slug: "user",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
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
      type: "number",
      required: true,
    },
  ],
};

import type { CollectionConfig } from "payload";

export const Payment: CollectionConfig = {
  slug: "payments",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: "transaction_id",
  },
  fields: [
    {
      name: "booking_id",
      type: "relationship",
      relationTo: "bookings",
      required: true,
    },
    {
      name: "user_id",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "status",
      type: "text",
      required: true,
    },
    {
      name: "method",
      type: "text",
      required: true,
    },
    {
      name: "transaction_id",
      type: "text",
      required: true,
    },
    {
      name: "paid_at",
      type: "date",
      required: true,
    },
  ],
};
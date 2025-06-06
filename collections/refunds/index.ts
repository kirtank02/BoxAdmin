import type { CollectionConfig } from "payload";

export const Refund: CollectionConfig = {
  slug: "refunds",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "payment_id",
      type: "relationship",
      relationTo: "payments",
      required: true,
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "reason",
      type: "textarea",
      required: true,
    },
    {
      name: "refund_status",
      type: "text",
      required: true,
    },
    {
      name: "refunded_at",
      type: "date",
      required: true,
    },
  ],
};
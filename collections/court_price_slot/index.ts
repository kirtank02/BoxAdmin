import type { CollectionConfig } from "payload";

export const Court_Price_Slot: CollectionConfig = {
  slug: "court-price-slot",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "court_id",
      type: "relationship",
      relationTo: "courts", // Use the slug of your Court collection
      required: true,
    },
    {
      name: "day_of_week",
      type: "select",
      required: true,
      options: [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
      ],
    },
    {
      name: "start_time",
      type: "text",
      required: true,
    },
    {
      name: "end_time",
      type: "text",
      required: true,
    },
    {
      name: "price_per_hour",
      type: "number",
      required: true,
    },
  ],
};
import { CollectionConfig } from "payload";

export const Booking: CollectionConfig = {
  slug: "bookings",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "user_id",
      type: "relationship",
      relationTo: "users", // Adjust based on your actual users collection slug
      required: true,
    },
    {
      name: "court_id",
      type: "relationship",
      relationTo: "courts", // Assumes you are linking to BoxCricketCourt collection
      required: true,
    },
    {
      name: "start_date_time",
      type: "date",
      required: true,
    },
    {
      name: "end_date_time",
      type: "date",
      required: true,
    },
    {
      name: "status",
      type: "text",
      required: true,
    },
    {
      name: "calcom_booking_id",
      type: "text",
      required: false,
    },
  ],
};
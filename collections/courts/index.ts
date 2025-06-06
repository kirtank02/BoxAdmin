import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Courts: CollectionConfig = {
  slug: "courts",
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "venue",
      required: true,
      type: 'relationship',
      relationTo: 'venues',
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "area",
      type: "text",
      required: true,
    },
    {
      name: "surface",
      type: "select",
      required: true,
      options: [
        { label: "Turf", value: "turf" },
        { label: "Mat", value: "mat" },
        { label: "Clay", value: "clay" },
        { label: "Concrete", value: "concrete" },
        { label: "Grass", value: "grass" },
      ],
    },
    {
      name: "sport_type",
      type: "select",
      required: true,
      options: [
        { label: "Box Cricket", value: "box_cricket" },
        { label: "Football", value: "football" },
        { label: "Badminton", value: "badminton" },
        { label: "Tennis", value: "tennis" },
        { label: "Volleyball", value: "volleyball" },
      ],
    },

    {
      name: "max_players",
      type: "number",
      required: true,
    },
    {
      name: "calcom_member_id",
      type: "text",
      required: true,
    },
    {
      name: "calcom_event_type_id",
      type: "text",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
    },
  ],
};
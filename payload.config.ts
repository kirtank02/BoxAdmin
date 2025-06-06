import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Pages } from "./collections/Pages";
import { Tenants } from "./collections/Tenants";
import Users from "./collections/Users";
import { Vans } from "./collections/Vans";
import { Media } from "./collections/Media";
import { Technicians } from "./collections/Technicians";
import { Services } from "./collections/Services";
import { Territory } from "./collections/Territory";
import { Configurations } from "./collections/Configurations";
import { StateEnvironmental } from "./collections/State Environmental";
import OwnerOrganizations from "./collections/Owner";
import { Courts } from "./collections/courts";
import { Court_Price_Slot } from "./collections/court_price_slot";
import { Refund } from "./collections/refunds";
import { Payment } from "./collections/payments";
import { User } from "./collections/user";
import { Booking } from "./collections/Bookings";
import { Managers } from "./collections/Managers";
import Venues from "./collections/Venues";
import Offer from "./collections/offer";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
  admin: {
    user: "users",
  },
  collections: [
    Pages,
    Users,
    Tenants,
    Vans,
    Media,
    Technicians,
    Services,
    Territory,
    Configurations,
    StateEnvironmental,
    OwnerOrganizations,
    Courts,
    Court_Price_Slot,
    Refund,
    Payment,
    User,
    Booking,
    Managers,
    Venues,
    Offer,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  onInit: async (args) => {
    // if (process.env.SEED_DB) {
    //   await seed(args);
    // }
  },
  editor: lexicalEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // plugins and endpoints removed
});

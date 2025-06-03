import { VenuesTemplate } from "@/modules/venues/templates/venues-template";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Venues",
   description: "View & manage sports venues",
};

export default function VenuesPage() {
   return <VenuesTemplate />;
} 
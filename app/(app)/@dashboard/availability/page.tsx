import { AvailabilityTemplate } from "@/modules/availability/templates/availability-template";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Availability",
   description: "Control when courts are open/closed",
};

export default function AvailabilityPage() {
   return <AvailabilityTemplate />;
} 
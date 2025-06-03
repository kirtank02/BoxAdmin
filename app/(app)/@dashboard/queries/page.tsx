import { QueriesTemplate } from "@/modules/queries/templates/queries-template";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Queries",
   description: "Handle customer issues and queries",
};

export default function QueriesPage() {
   return <QueriesTemplate />;
} 
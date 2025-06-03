import { ManagerTemplate } from "@/modules/manager/templates/manager-template";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Manager",
   description: "Manage staff or assistant managers",
};

export default function ManagerPage() {
   return <ManagerTemplate />;
} 
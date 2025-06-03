import { OrdersTemplate } from "@/modules/orders/templates/orders-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Booking | Orders",
  description: "View all bookings (as orders)",
};

export default function OrdersPage() {
  return <OrdersTemplate />;
}
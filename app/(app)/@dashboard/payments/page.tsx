import { PaymentsTemplate } from "@/modules/payments/templates/payments-template";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Payment History",
   description: "Track earnings, refunds, commissions",
};

export default function PaymentsPage() {
   return <PaymentsTemplate />;
} 
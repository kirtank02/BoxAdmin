import AppointmentsTemplate from "@/modules/dashboard/appointments/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Homepage - appointments",
  description: "Treadcommand | Homepage - appointments",
};

export default async function AppointmentsPage() {
  return (
    <div className="px-6">
      <AppointmentsTemplate />
    </div>
  );
}

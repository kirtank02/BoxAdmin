import { ManagerTemplate } from "@/modules/manager/templates/manager-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Manager",
  description: "Treadcommand | Manager",
};

export default function ManagerPage() {
  return (
    <ManagerTemplate />
  );
}   
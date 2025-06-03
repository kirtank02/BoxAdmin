import { Manager } from "@/types/manager";

export async function getManagers(): Promise<Manager[]> {
   // This would be replaced with an actual API call
   return [
      {
         id: "1",
         name: "John Doe",
         email: "john@example.com",
         role: "admin",
         status: true,
         assignedVenues: ["venue1", "venue2"],
         createdAt: new Date("2024-01-01"),
         updatedAt: new Date("2024-01-01"),
      },
      {
         id: "2",
         name: "Jane Smith",
         email: "jane@example.com",
         role: "manager",
         status: true,
         assignedVenues: ["venue3"],
         createdAt: new Date("2024-01-02"),
         updatedAt: new Date("2024-01-02"),
      },
      {
         id: "3",
         name: "Bob Johnson",
         email: "bob@example.com",
         role: "staff",
         status: false,
         assignedVenues: [],
         createdAt: new Date("2024-01-03"),
         updatedAt: new Date("2024-01-03"),
      },
   ];
} 
import { ColumnDef } from "@tanstack/react-table";
import { Manager } from "@/types/manager";
import { Switch } from "@/components/shadcn/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { format } from "date-fns";

interface GetColumnsProps {
   isLoading: boolean;
   onStatusChange: (id: string, status: boolean) => void;
   onRoleChange: (id: string, role: string) => void;
}

export function getColumns({ isLoading, onStatusChange, onRoleChange }: GetColumnsProps): ColumnDef<Manager>[] {
   return [
      {
         accessorKey: "name",
         header: "Name",
      },
      {
         accessorKey: "email",
         header: "Email",
      },
      {
         accessorKey: "role",
         header: "Role",
         cell: ({ row }) => {
            const manager = row.original;
            return (
               <Select
                  disabled={isLoading}
                  defaultValue={manager.role}
                  onValueChange={(value) => onRoleChange(manager.id, value)}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="admin">Admin</SelectItem>
                     <SelectItem value="manager">Manager</SelectItem>
                     <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
               </Select>
            );
         },
      },
      {
         accessorKey: "status",
         header: "Status",
         cell: ({ row }) => {
            const manager = row.original;
            return (
               <Switch
                  disabled={isLoading}
                  checked={manager.status}
                  onCheckedChange={(checked) => onStatusChange(manager.id, checked)}
               />
            );
         },
      },
      {
         accessorKey: "createdAt",
         header: "Created At",
         cell: ({ row }) => {
            return format(new Date(row.original.createdAt), "MMM dd, yyyy");
         },
      },
      {
         accessorKey: "updatedAt",
         header: "Updated At",
         cell: ({ row }) => {
            return format(new Date(row.original.updatedAt), "MMM dd, yyyy");
         },
      },
   ];
} 
"use client"

import { Card } from "@/components/shadcn/card";
import { Manager } from "@/types/manager";
import { useState } from "react";
import { ContentTable } from "@/components/common/table/content-table";
import { PaginationTable } from "@/components/common/table/pagination-table";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { TableProps } from "@/types/table";
import { useTable } from "@/hooks/use-table";
import { getColumns } from "./columns";

export interface ManagerTableProps extends TableProps {
   data: Manager[];
}

export function ManagerTable({ data, isLoading = false, pagination }: ManagerTableProps) {
   const [tableData, setTableData] = useState<Manager[]>(data);

   const columns = getColumns({
      isLoading,
      onStatusChange: handleStatusChange,
      onRoleChange: handleRoleChange,
   });

   const { table } = useTable({ data: tableData, columns });

   function handleStatusChange(id: string, status: boolean): void {
      setTableData(prev => prev.map(item => {
         if (item.id === id) {
            return { ...item, status };
         }
         return item;
      }));
   }

   function handleRoleChange(id: string, role: string): void {
      setTableData(prev => prev.map(item => {
         if (item.id === id) {
            return { ...item, role };
         }
         return item;
      }));
   }

   return (
      <div className="space-y-5 mt-6">
         <Card>
            <div className="flex items-center justify-end px-4 py-2">
               <FilterOptionsButton<Manager>
                  disabled={isLoading}
                  label="Filter"
                  table={table}
                  filters={[]}
               />
            </div>
            <ContentTable
               columns={columns}
               table={table}
               isHeaderGrouping
               rowCn="hover:bg-brand-primary-100 cursor-pointer"
            />
         </Card>
         <PaginationTable table={table} pagination={pagination} />
      </div>
   );
} 
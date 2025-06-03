import SearchInput from "@/components/common/search-input";
import { UserIcon } from "lucide-react";
import { ManagerTableTemplate } from "../components/manager-table/template";
import { Suspense } from "react";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { ManagerTable, ManagerTableProps } from "@/modules/manager/components/manager-table";

export function ManagerTemplate() {
   const { data, pagination } = getTableLoadingData();

   return (
      <div className="py-8 px-6">
         <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
               <UserIcon className="min-w-6 min-h-6" />
               <p className="text-lg font-bold">Manage Staff</p>
            </div>
            <SearchInput />
         </div>
         <Suspense fallback={<ManagerTable data={data as ManagerTableProps['data']} pagination={pagination} isLoading />}>
            <ManagerTableTemplate />
         </Suspense>
      </div>
   );
} 
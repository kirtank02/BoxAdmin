import { PaginationInterface } from "@/types/pagination";
import { Manager } from "@/types/manager";
import { getManagers } from "@/mocks/manager";
import { ManagerTable } from "@/modules/manager/components/manager-table";

export async function ManagerTableTemplate() {
   const data: Manager[] | null = await getManagers();

   if (!data) {
      return <div>No managers found</div>;
   }

   const pagination: PaginationInterface = {
      pageIndex: 1,
      pageSize: 10,
      totalCount: data.length,
   };

   return <ManagerTable data={data} pagination={pagination} />;
} 
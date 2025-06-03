import React from "react";

export function HomepageTemplate() {
   return (
      <div className="py-8 px-6">
         <h1 className="text-2xl font-bold mb-6">Business Insights & Daily Activity</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Revenue Charts Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
               <h2 className="text-lg font-semibold mb-2">Revenue Charts</h2>
               <div className="h-48 flex items-center justify-center text-gray-400">
                  [Revenue Chart (Daily/Weekly/Monthly)]
               </div>
            </div>
            {/* Today's Bookings List Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
               <h2 className="text-lg font-semibold mb-2">Today's Bookings</h2>
               <div className="h-48 flex items-center justify-center text-gray-400">
                  [Today's Bookings List]
               </div>
            </div>
         </div>
         {/* Add more dashboard widgets as needed */}
      </div>
   );
} 
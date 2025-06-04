"use client"

import { useState } from "react"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Badge } from "@/components/shadcn/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import {
   Search,
   Filter,
   Download,
   TrendingUp,
   DollarSign,
   CreditCard,
   AlertCircle,
   CheckCircle2,
   Clock,
   MoreHorizontal,
   Calendar,
   ArrowUpRight,
   ArrowDownRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"

// Mock data for payments
const mockPayments = [
   {
      id: "1",
      transaction_id: "TXN-001",
      booking_id: "BKG-001",
      user_id: "USR-001",
      user_name: "John Doe",
      amount: 120.5,
      status: "completed",
      method: "Credit Card",
      paid_at: "2024-01-01",
      type: "booking",
   },
   {
      id: "2",
      transaction_id: "TXN-002",
      booking_id: "BKG-002",
      user_id: "USR-002",
      user_name: "Jane Smith",
      amount: 75.0,
      status: "completed",
      method: "PayPal",
      paid_at: "2024-01-02",
      type: "booking",
   },
   {
      id: "3",
      transaction_id: "TXN-003",
      booking_id: "BKG-003",
      user_id: "USR-003",
      user_name: "Mike Johnson",
      amount: 200.0,
      status: "failed",
      method: "Bank Transfer",
      paid_at: "2024-01-03",
      type: "booking",
   },
   {
      id: "4",
      transaction_id: "TXN-004",
      booking_id: "BKG-004",
      user_id: "USR-004",
      user_name: "Sarah Wilson",
      amount: 45.0,
      status: "pending",
      method: "Credit Card",
      paid_at: "2024-01-04",
      type: "refund",
   },
   {
      id: "5",
      transaction_id: "TXN-005",
      booking_id: "BKG-005",
      user_id: "USR-005",
      user_name: "David Brown",
      amount: 180.0,
      status: "completed",
      method: "Apple Pay",
      paid_at: "2024-01-05",
      type: "booking",
   },
]

// Component for displaying payment status with appropriate styling and icon
function StatusBadge({ status }: { status: string }) {
   const statusConfig = {
      completed: {
         icon: CheckCircle2,
         className: "bg-green-100 text-green-700 border-green-200",
         label: "Completed",
      },
      pending: {
         icon: Clock,
         className: "bg-yellow-100 text-yellow-700 border-yellow-200",
         label: "Pending",
      },
      failed: {
         icon: AlertCircle,
         className: "bg-red-100 text-red-700 border-red-200",
         label: "Failed",
      },
   }

   const config = statusConfig[status as keyof typeof statusConfig]
   const Icon = config.icon

   return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${config.className}`}>
         <Icon className="w-3.5 h-3.5 mr-1.5" />
         {config.label}
      </div>
   )
}

// Component for displaying payment method icons
function PaymentMethodIcon({ method }: { method: string }) {
   const iconMap = {
      "Credit Card": CreditCard,
      PayPal: DollarSign,
      "Bank Transfer": TrendingUp,
      "Apple Pay": CreditCard,
   }

   const Icon = iconMap[method as keyof typeof iconMap] || CreditCard
   return <Icon className="w-4.5 h-4.5 text-gray-500" />
}

// Main Payments Dashboard Template
export function PaymentsTemplate() {
   const [searchTerm, setSearchTerm] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const [methodFilter, setMethodFilter] = useState("all")

   // Filter payments based on search term, status, and method
   const filteredPayments = mockPayments.filter((payment) => {
      const matchesSearch =
         payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         payment.booking_id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter
      const matchesMethod = methodFilter === "all" || payment.method === methodFilter

      return matchesSearch && matchesStatus && matchesMethod
   })

   // Calculate summary statistics
   const totalAmount = mockPayments.reduce((sum, payment) => sum + payment.amount, 0)
   const completedPayments = mockPayments.filter((p) => p.status === "completed").length
   const pendingAmount = mockPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
   const successRate = (completedPayments / mockPayments.length) * 100 || 0;


   return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans antialiased">
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
               <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Payment History</h1>
               <p className="text-gray-500 mt-2 text-lg">Track and manage all your financial transactions with ease.</p>
            </div>

            {/* Action Buttons (Last 30 days, Export Data) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div className="flex-1" />
               <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-100 transition-all rounded-lg shadow-sm">
                     <Calendar className="w-4 h-4 text-gray-500" />
                     <span className="font-medium">Last 30 days</span>
                  </Button>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                     <Download className="w-4 h-4" />
                     <span className="font-medium">Export Data</span>
                  </Button>
               </div>
            </div>

            {/* Summary Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {/* Total Revenue Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <ArrowUpRight className="w-4 h-4 mr-1" />
                           +12.5% from last month
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-blue-100 p-3 shadow-inner">
                              <DollarSign className="w-6 h-6 text-blue-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Completed Payments Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Completed Payments</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">{completedPayments}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <ArrowUpRight className="w-4 h-4 mr-1" />
                           +8.2% from last month
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-green-100 p-3 shadow-inner">
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Pending Amount Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Pending Amount</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">${pendingAmount.toFixed(2)}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-yellow-600 font-medium">
                           <Clock className="w-4 h-4 mr-1" />2 transactions pending
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-yellow-100 p-3 shadow-inner">
                              <Clock className="w-6 h-6 text-yellow-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Success Rate Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Success Rate</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">{successRate.toFixed(1)}%</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-red-600 font-medium">
                           <ArrowDownRight className="w-4 h-4 mr-1" />
                           -2.1% from last month
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-purple-100 p-3 shadow-inner">
                              <TrendingUp className="w-6 h-6 text-purple-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Filters and Search Section */}
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                     placeholder="Search transactions, users, or booking IDs..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-11 pr-4 py-2 border-gray-300 rounded-lg focus-visible:ring-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-0 transition-all text-gray-800"
                  />
               </div>
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors">
                     <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg">
                     <SelectItem value="all">All Status</SelectItem>
                     <SelectItem value="completed">Completed</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
               </Select>
               <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors">
                     <SelectValue placeholder="All Methods" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg">
                     <SelectItem value="all">All Methods</SelectItem>
                     <SelectItem value="Credit Card">Credit Card</SelectItem>
                     <SelectItem value="PayPal">PayPal</SelectItem>
                     <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                     <SelectItem value="Apple Pay">Apple Pay</SelectItem>
                  </SelectContent>
               </Select>
               <Button variant="outline" className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all rounded-lg shadow-sm">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">More Filters</span>
               </Button>
            </div>

            {/* Payments Table Section */}
            <div>
               <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
               <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader>
                           <TableRow className="bg-gray-100 border-b border-gray-200">
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Amount</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</TableHead>
                              <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</TableHead>
                              <TableHead className="w-12"></TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {filteredPayments.length === 0 ? (
                              <TableRow>
                                 <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                    No transactions found matching your criteria.
                                 </TableCell>
                              </TableRow>
                           ) : (
                              filteredPayments.map((payment, index) => (
                                 <TableRow
                                    key={payment.id}
                                    className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}
                                 >
                                    <TableCell className="px-6 py-4">
                                       <div className="space-y-0.5">
                                          <div className="font-medium text-gray-900 text-sm">{payment.transaction_id}</div>
                                          <div className="text-xs text-gray-500">{payment.booking_id}</div>
                                       </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                       <div className="space-y-0.5">
                                          <div className="font-medium text-gray-900 text-sm">{payment.user_name}</div>
                                          <div className="text-xs text-gray-500">{payment.user_id}</div>
                                       </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                       <div className="font-bold text-gray-900">${payment.amount.toFixed(2)}</div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                       <StatusBadge status={payment.status} />
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                       <div className="flex items-center gap-2">
                                          <PaymentMethodIcon method={payment.method} />
                                          <span className="text-gray-700 font-medium">{payment.method}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-gray-700 text-sm">
                                       {new Date(payment.paid_at).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                       })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                       <Badge
                                          variant="secondary"
                                          className={`font-semibold px-2.5 py-1 ${payment.type === "refund"
                                             ? "bg-orange-100 text-orange-700 hover:bg-orange-100 border border-orange-200"
                                             : "bg-blue-100 text-blue-700 hover:bg-blue-100 border border-blue-200"
                                             }`}
                                       >
                                          {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                       <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-gray-500 hover:bg-gray-200">
                                                <MoreHorizontal className="w-4 h-4" />
                                             </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="shadow-lg rounded-md">
                                             <DropdownMenuItem className="focus:bg-gray-100 cursor-pointer">View Details</DropdownMenuItem>
                                             <DropdownMenuItem className="focus:bg-gray-100 cursor-pointer">Download Receipt</DropdownMenuItem>
                                             <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">Refund Payment</DropdownMenuItem>
                                          </DropdownMenuContent>
                                       </DropdownMenu>
                                    </TableCell>
                                 </TableRow>
                              ))
                           )}
                        </TableBody>
                     </Table>
                  </div>
               </div>
            </div>

            {/* Pagination Section */}
            <div className="flex items-center justify-between pt-4">
               <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredPayments.length}</span> of <span className="font-semibold">{mockPayments.length}</span> transactions
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={true} className="border-gray-300 text-gray-500 bg-white rounded-md hover:bg-gray-50 transition-colors">
                     Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-300 rounded-md hover:bg-indigo-100 transition-colors">
                     1
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">
                     2
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">
                     3
                  </Button>
                  <Button variant="outline" size="sm" disabled={false} className="border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">
                     Next
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
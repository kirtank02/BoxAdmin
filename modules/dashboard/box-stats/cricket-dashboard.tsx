"use client"

import { useState } from "react"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Calendar, Download, TrendingUp, Users, Activity, BarChart3 } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   LineChart,
   Line,
   PieChart as RechartsPieChart,
   Pie,
   Cell,
   RadarChart,
   PolarGrid,
   PolarAngleAxis,
   PolarRadiusAxis,
   Radar,
} from "recharts"
import type { PieLabelRenderProps } from 'recharts'

// Mock data for cricket bookings
const dailyBookings = [
   { day: "Mon", bookings: 12, revenue: 6000 },
   { day: "Tue", bookings: 8, revenue: 4000 },
   { day: "Wed", bookings: 15, revenue: 7500 },
   { day: "Thu", bookings: 10, revenue: 5000 },
   { day: "Fri", bookings: 18, revenue: 9000 },
   { day: "Sat", bookings: 24, revenue: 12000 },
   { day: "Sun", bookings: 22, revenue: 11000 },
]

const monthlyBookings = [
   { month: "Jan", bookings: 120, revenue: 60000 },
   { month: "Feb", bookings: 150, revenue: 75000 },
   { month: "Mar", bookings: 180, revenue: 90000 },
   { month: "Apr", bookings: 200, revenue: 100000 },
   { month: "May", bookings: 220, revenue: 110000 },
   { month: "Jun", bookings: 250, revenue: 125000 },
]

const timeSlotPopularity = [
   { name: "6AM-9AM", value: 15 },
   { name: "9AM-12PM", value: 10 },
   { name: "12PM-3PM", value: 8 },
   { name: "3PM-6PM", value: 12 },
   { name: "6PM-9PM", value: 30 },
   { name: "9PM-12AM", value: 25 },
]

const courtUtilization = [
   { court: "Court 1", utilization: 85 },
   { court: "Court 2", utilization: 75 },
   { court: "Court 3", utilization: 90 },
   { court: "Court 4", utilization: 65 },
   { court: "Court 5", utilization: 80 },
]

const customerSegmentation = [
   { name: "Regular", value: 55 },
   { name: "Occasional", value: 30 },
   { name: "New", value: 15 },
]

const packagePopularity = [
   { name: "1 Hour", value: 25 },
   { name: "2 Hours", value: 45 },
   { name: "3+ Hours", value: 15 },
   { name: "Tournament", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

// Main Cricket Dashboard Template
export function CricketDashboard() {
   const [timeRange, setTimeRange] = useState("weekly")

   // Calculate summary statistics
   const totalRevenue = monthlyBookings.reduce((sum, month) => sum + month.revenue, 0)
   const totalBookings = monthlyBookings.reduce((sum, month) => sum + month.bookings, 0)
   const averageBookingValue = totalRevenue / totalBookings
   const peakUtilization = Math.max(...courtUtilization.map((court) => court.utilization))

   // PDF Export Handler
   const handleExportPDF = () => {
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text("Box Cricket Analytics Report", 14, 16)
      doc.setFontSize(10)

      // Add booking data
      doc.text("Booking Statistics", 14, 30)
      const bookingHeaders = ["Month", "Bookings", "Revenue (₹)"]
      const bookingData = monthlyBookings.map((month) => [month.month, month.bookings, month.revenue.toLocaleString()])

      autoTable(doc, {
         head: [bookingHeaders],
         body: bookingData,
         startY: 35,
         styles: { fontSize: 10, cellPadding: 3 },
         headStyles: { fillColor: [49, 46, 129], textColor: 255, fontStyle: "bold" },
         alternateRowStyles: { fillColor: [245, 245, 245] },
         margin: { left: 14, right: 14 },
      })

      // Add court utilization
      doc.text("Court Utilization", 14, 110)
      const courtHeaders = ["Court", "Utilization (%)"]
      const courtData = courtUtilization.map((court) => [court.court, court.utilization])

      autoTable(doc, {
         head: [courtHeaders],
         body: courtData,
         startY: 115,
         styles: { fontSize: 10, cellPadding: 3 },
         headStyles: { fillColor: [49, 46, 129], textColor: 255, fontStyle: "bold" },
         alternateRowStyles: { fillColor: [245, 245, 245] },
         margin: { left: 14, right: 14 },
      })

      doc.save("cricket_analytics_report.pdf")
   }

   return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans antialiased">
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
               <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Box Cricket Dashboard</h1>
               <p className="text-gray-500 mt-2 text-lg">Comprehensive analytics for your box cricket business</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div className="flex items-center gap-3">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                     <SelectTrigger className="w-36 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors">
                        <SelectValue placeholder="Time Range" />
                     </SelectTrigger>
                     <SelectContent className="rounded-lg shadow-lg">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex items-center gap-3">
                  <Button
                     variant="outline"
                     className="gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-100 transition-all rounded-lg shadow-sm"
                  >
                     <Calendar className="w-4 h-4 text-gray-500" />
                     <span className="font-medium">Last 30 days</span>
                  </Button>
                  <Button
                     className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                     onClick={handleExportPDF}
                  >
                     <Download className="w-4 h-4" />
                     <span className="font-medium">Export Report</span>
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
                           <span className="text-4xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <TrendingUp className="w-4 h-4 mr-1" />
                           +15.2% from last period
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-blue-100 p-3 shadow-inner">
                              <BarChart3 className="w-6 h-6 text-blue-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Total Bookings Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Total Bookings</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">{totalBookings}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <TrendingUp className="w-4 h-4 mr-1" />
                           +8.7% from last period
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-green-100 p-3 shadow-inner">
                              <Calendar className="w-6 h-6 text-green-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Average Booking Value Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Avg. Booking Value</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">₹{averageBookingValue.toFixed(0)}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <TrendingUp className="w-4 h-4 mr-1" />
                           +5.3% from last period
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-yellow-100 p-3 shadow-inner">
                              <Users className="w-6 h-6 text-yellow-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Peak Utilization Card */}
               <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-6">
                     <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-500">Peak Utilization</div>
                        <div className="mt-3 flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">{peakUtilization}%</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                           <TrendingUp className="w-4 h-4 mr-1" />
                           +3.1% from last period
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="rounded-full bg-purple-100 p-3 shadow-inner">
                              <Activity className="w-6 h-6 text-purple-600" />
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Charts Section - First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Booking Trends Chart */}
               <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardHeader className="pb-0">
                     <CardTitle className="text-lg font-semibold text-gray-800">Booking & Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <LineChart
                              data={timeRange === "daily" ? dailyBookings : monthlyBookings}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                           >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey={timeRange === "daily" ? "day" : "month"} tick={{ fill: "#6b7280" }} />
                              <YAxis yAxisId="left" tick={{ fill: "#6b7280" }} />
                              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#6b7280" }} />
                              <Tooltip
                                 contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #e5e7eb",
                                 }}
                              />
                              <Legend />
                              <Line
                                 yAxisId="left"
                                 type="monotone"
                                 dataKey="bookings"
                                 stroke="#4f46e5"
                                 strokeWidth={2}
                                 activeDot={{ r: 8 }}
                                 name="Bookings"
                              />
                              <Line
                                 yAxisId="right"
                                 type="monotone"
                                 dataKey="revenue"
                                 stroke="#10b981"
                                 strokeWidth={2}
                                 name="Revenue (₹)"
                              />
                           </LineChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>

               {/* Time Slot Popularity Chart */}
               <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardHeader className="pb-0">
                     <CardTitle className="text-lg font-semibold text-gray-800">Time Slot Popularity</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={timeSlotPopularity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                              <YAxis tick={{ fill: "#6b7280" }} />
                              <Tooltip
                                 contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #e5e7eb",
                                 }}
                              />
                              <Legend />
                              <Bar dataKey="value" fill="#8884d8" name="Bookings" radius={[4, 4, 0, 0]}>
                                 {timeSlotPopularity.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Charts Section - Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Court Utilization Chart */}
               <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardHeader className="pb-0">
                     <CardTitle className="text-lg font-semibold text-gray-800">Court Utilization</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={courtUtilization}>
                              <PolarGrid stroke="#e5e7eb" />
                              <PolarAngleAxis dataKey="court" tick={{ fill: "#6b7280", fontSize: 12 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                              <Radar name="Utilization" dataKey="utilization" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                              <Tooltip
                                 contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #e5e7eb",
                                 }}
                              />
                              <Legend />
                           </RadarChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>

               {/* Customer Segmentation Chart */}
               <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardHeader className="pb-0">
                     <CardTitle className="text-lg font-semibold text-gray-800">Customer Segmentation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <RechartsPieChart>
                              <Pie
                                 data={customerSegmentation}
                                 cx="50%"
                                 cy="50%"
                                 labelLine={false}
                                 label={({ name, percent }: PieLabelRenderProps) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                 outerRadius={80}
                                 fill="#8884d8"
                                 dataKey="value"
                              >
                                 {customerSegmentation.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                 ))}
                              </Pie>
                              <Tooltip
                                 contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #e5e7eb",
                                 }}
                              />
                           </RechartsPieChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>

               {/* Package Popularity Chart */}
               <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
                  <CardHeader className="pb-0">
                     <CardTitle className="text-lg font-semibold text-gray-800">Package Popularity</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <RechartsPieChart>
                              <Pie
                                 data={packagePopularity}
                                 cx="50%"
                                 cy="50%"
                                 labelLine={false}
                                 label={({ name, percent }: PieLabelRenderProps) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                 outerRadius={80}
                                 fill="#8884d8"
                                 dataKey="value"
                              >
                                 {packagePopularity.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                 ))}
                              </Pie>
                              <Tooltip
                                 contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    border: "1px solid #e5e7eb",
                                 }}
                              />
                           </RechartsPieChart>
                        </ResponsiveContainer>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
} 
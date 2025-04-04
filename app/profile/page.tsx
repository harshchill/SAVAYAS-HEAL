"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  User,
  Settings,
  Calendar,
  Clock,
  Star,
  Edit,
  LogOut,
  Bell,
  Shield,
  CreditCard,
  ChevronRight,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

// Mock data for appointments
const upcomingAppointments = [
  {
    id: "apt-001",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Psychiatrist",
    date: "2025-04-05",
    time: "10:00 AM",
    type: "Video Call",
    status: "confirmed",
  },
  {
    id: "apt-002",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Therapist",
    date: "2025-04-12",
    time: "2:30 PM",
    type: "In-Person",
    status: "confirmed",
  },
]

const pastAppointments = [
  {
    id: "apt-003",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Psychologist",
    date: "2025-03-20",
    time: "11:00 AM",
    type: "Video Call",
    status: "completed",
    reviewed: true,
  },
  {
    id: "apt-004",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Psychiatrist",
    date: "2025-03-10",
    time: "3:00 PM",
    type: "Phone Call",
    status: "completed",
    reviewed: false,
  },
  {
    id: "apt-005",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Therapist",
    date: "2025-02-28",
    time: "1:00 PM",
    type: "In-Person",
    status: "completed",
    reviewed: true,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [editMode, setEditMode] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra",
    bio: "I'm focused on improving my mental health and well-being.",
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    privacy: {
      profileVisibility: "private",
      shareData: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (type: "email" | "sms" | "app", checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked,
      },
    }))
  }

  const handlePrivacyChange = (type: "shareData", checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: checked,
      },
    }))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <motion.div className="hidden md:block" initial="hidden" animate="visible" variants={fadeIn}>
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-xl font-bold">{userData.name}</h2>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <nav className="space-y-2">
                    <Button
                      variant={activeTab === "personal" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("personal")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Info
                    </Button>
                    <Button
                      variant={activeTab === "appointments" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Appointments
                    </Button>
                    <Button
                      variant={activeTab === "history" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("history")}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      History
                    </Button>
                    <Button
                      variant={activeTab === "reviews" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("reviews")}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      My Reviews
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </nav>

                  <Separator className="my-6" />

                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                        {editMode ? (
                          "Cancel"
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={userData.bio} onChange={handleInputChange} rows={4} />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                              <p className="mt-1">{userData.name}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Email</h3>
                              <p className="mt-1">{userData.email}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                              <p className="mt-1">{userData.phone}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Address</h3>
                              <p className="mt-1">{userData.address}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                            <p className="mt-1">{userData.bio}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setEditMode(false)}>Save Changes</Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>

                {/* Appointments Tab */}
                <TabsContent value="appointments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Manage your scheduled appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingAppointments.map((appointment) => (
                            <Card key={appointment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <div className="p-4 md:p-6 flex-1">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h3 className="font-medium">{appointment.doctorName}</h3>
                                        <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
                                      </div>
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        {appointment.status === "confirmed" ? "Confirmed" : appointment.status}
                                      </Badge>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="text-sm font-medium">{formatDate(appointment.date)}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Time</p>
                                        <p className="text-sm font-medium">{appointment.time}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Type</p>
                                        <p className="text-sm font-medium">{appointment.type}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-4 md:p-6 flex flex-row md:flex-col justify-between items-center md:w-48">
                                    <div className="flex flex-col items-center text-center">
                                      <Button variant="outline" className="mb-2">
                                        Reschedule
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                    <Button variant="link" className="text-pink-500 hover:text-pink-600">
                                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Upcoming Appointments</h3>
                          <p className="text-gray-500 mb-4">You don't have any appointments scheduled.</p>
                          <Button asChild>
                            <Link href="/professionals">Book an Appointment</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appointment History</CardTitle>
                      <CardDescription>View your past appointments and sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pastAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {pastAppointments.map((appointment) => (
                            <Card key={appointment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  <div className="p-4 md:p-6 flex-1">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h3 className="font-medium">{appointment.doctorName}</h3>
                                        <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
                                      </div>
                                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                        {appointment.status === "completed" ? "Completed" : appointment.status}
                                      </Badge>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="text-sm font-medium">{formatDate(appointment.date)}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Time</p>
                                        <p className="text-sm font-medium">{appointment.time}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Type</p>
                                        <p className="text-sm font-medium">{appointment.type}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-4 md:p-6 flex flex-row md:flex-col justify-between items-center md:w-48">
                                    {appointment.reviewed ? (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        <CheckCircle className="h-3 w-3 mr-1" /> Reviewed
                                      </Badge>
                                    ) : (
                                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                                        Leave Review
                                      </Button>
                                    )}
                                    <Button variant="link" className="text-pink-500 hover:text-pink-600">
                                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Past Appointments</h3>
                          <p className="text-gray-500 mb-4">You haven't had any appointments yet.</p>
                          <Button asChild>
                            <Link href="/professionals">Book Your First Appointment</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Reviews</CardTitle>
                      <CardDescription>Reviews you've left for professionals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Dr. Emily Rodriguez</h3>
                              <p className="text-sm text-gray-500">Psychologist</p>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">March 20, 2025</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600">
                            Dr. Rodriguez was very professional and understanding. She provided practical advice that
                            has been helping me manage my anxiety. I would definitely recommend her to others.
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Dr. Michael Chen</h3>
                              <p className="text-sm text-gray-500">Therapist</p>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">February 28, 2025</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600">
                            Dr. Chen has a very calming presence and creates a safe space for discussion. He's helped me
                            work through some difficult issues with my family relationships.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive appointment reminders and updates via email</p>
                          </div>
                          <Switch
                            checked={userData.notifications.email}
                            onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">SMS Notifications</h3>
                            <p className="text-sm text-gray-500">Receive text message reminders for appointments</p>
                          </div>
                          <Switch
                            checked={userData.notifications.sms}
                            onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">App Notifications</h3>
                            <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                          </div>
                          <Switch
                            checked={userData.notifications.app}
                            onCheckedChange={(checked) => handleNotificationChange("app", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Manage your privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Data Sharing</h3>
                            <p className="text-sm text-gray-500">
                              Allow anonymous data sharing to improve our services
                            </p>
                          </div>
                          <Switch
                            checked={userData.privacy.shareData}
                            onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Button variant="outline" className="w-full sm:w-auto">
                          <Shield className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                      </div>
                      <div>
                        <Button variant="outline" className="w-full sm:w-auto">
                          <Bell className="mr-2 h-4 w-4" />
                          Two-Factor Authentication
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <CreditCard className="h-8 w-8 text-gray-400 mr-4" />
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-gray-500">Expires 12/25</p>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Add Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-100">
                    <CardHeader>
                      <CardTitle className="text-red-600">Danger Zone</CardTitle>
                      <CardDescription>Irreversible account actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border border-red-200 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-red-600">Delete Account</h3>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                          </div>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}


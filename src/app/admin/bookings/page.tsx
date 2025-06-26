import { getAllBookings } from "@/lib/admin/bookings";
import AdminBookingsPage from "./_client";

export default async function BookingsPageServer() {
  const bookings = await getAllBookings();

  return <AdminBookingsPage bookings={bookings || []} />;
}

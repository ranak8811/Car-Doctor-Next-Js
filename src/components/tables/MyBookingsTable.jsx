"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'

const MyAllBookings = ({ data }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    // Using SweetAlert2 for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF3811',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      const deleteToast = toast.loading("Deleting...");
      try {
        const res = await fetch(`/api/booking/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully", { id: deleteToast });
          router.refresh();
        } else {
          toast.error("Failed to delete", { id: deleteToast });
        }
      } catch (error) {
        toast.error("Error deleting", { id: deleteToast });
      }
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    if (currentStatus === 'Confirm') return;

    const toastId = toast.loading("Updating Status...");
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Confirm' })
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success("Status Updated", { id: toastId });
        router.refresh();
      } else {
        toast.error("Failed to update", { id: toastId });
      }
    } catch (error) {
      toast.error("Error updating", { id: toastId });
    }
  }

  return (
    <div className="my-10 container mx-auto bg-[#F3F3F3] p-10 rounded-xl">
      <h1 className="text-center font-bold text-3xl my-4 mb-8">My Bookings</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gray-100 rounded-t-lg">
            <tr>
              <th>
                {/* Delete Action Header */}
              </th>
              <th>Service Image</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id} className="border-b">
                <th>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-circle btn-sm btn-outline hover:bg-[#FF3811] hover:text-white border-gray-400">
                    <MdDelete className="h-5 w-5" />
                  </button>
                </th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <Image
                        src={item.service_img || "/assets/images/checkout/checkout.png"}
                        alt={item.service_name}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-lg">{item.service_name}</div>
                  <div className="text-sm opacity-50">{item.address}</div>
                </td>
                <td className="font-semibold text-[#444]">${item.service_price}</td>
                <td className="font-semibold text-[#444]">{item.date}</td>
                <th>
                  <button
                    onClick={() => handleStatusUpdate(item._id, item.status)}
                    className={`btn btn-ghost btn-xs font-bold text-white px-4 py-1 h-auto ${item.status === 'Confirm' ? 'bg-green-500 hover:bg-green-600' : 'bg-[#FF3811] hover:bg-[#d82a0a]'}`}>
                    {item.status === 'Confirm' ? 'Confirmed' : 'Pending'}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
};
export default MyAllBookings;

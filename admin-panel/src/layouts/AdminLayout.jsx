import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-6">
          <Outlet /> {/* हर पेज का content यहां render होगा */}
        </div>
      </div>
    </div>
  );
}

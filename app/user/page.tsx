import { AddUserModal } from "@/components/AddUserModal";
import { UserTable } from "@/components/UserTable";

export default function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <AddUserModal />
      <UserTable />
    </div>
  );
}

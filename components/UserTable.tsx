import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteUserButton } from "./DeleteUserButton";
import Link from "next/link";
import { Button } from "./ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
}


export async function UserTable() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users: User[] = await res.json();
    console.log(users)


  return (
    <Table>
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
         <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user:User) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <DeleteUserButton id={user._id} />
              <Link href={`/user/${user._id}`}>
                <Button>View Details</Button>
              </Link>
              <Link href={`/user/${user._id}`}>
                <Button>Edit</Button>
              </Link>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  )
}

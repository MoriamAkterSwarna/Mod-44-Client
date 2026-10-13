import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateForm } from "@/components/UpdateForm";


export interface User {
  _id?: string;
  name: string;
  email: string;
}

export default async function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>User not found (id: {id})</div>;
  }

  const userData : User = await res.json();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{userData.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Email: {userData.email}</p>

          <p className="text-sm text-muted-foreground">ID: {userData._id}</p>

          <UpdateForm userData={userData} />
          <Link href="/user"><Button variant="outline">Back to Users</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}

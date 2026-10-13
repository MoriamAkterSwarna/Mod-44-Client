"use client";
import { User } from "@/app/user/[id]/page";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function UpdateForm({ userData }: { userData: User }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userData._id}`, {
    method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    router.refresh(); // Refresh the current route to update the user list

  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet className="w-full max-w-xs">
        <FieldTitle className="text-lg font-semibold">Update User</FieldTitle>
        <FieldGroup>
          <Field>
            <Input id="name" name="name" type="text" defaultValue={userData.name} />
          </Field>
          <Field>
            <Input id="email" name="email" type="email" defaultValue={userData.email} />
          </Field>
          <Button type="submit" className="mt-2">
            Update
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

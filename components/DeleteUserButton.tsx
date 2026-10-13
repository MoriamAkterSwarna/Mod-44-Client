"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteUserButton({ id }: { id: string }) {
  const router = useRouter();
  

  const handleDelete = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!data.ok) {
      throw new Error("Failed to delete user");
    }

    router.refresh();
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
    >
      Delete
    </Button>
  );
}

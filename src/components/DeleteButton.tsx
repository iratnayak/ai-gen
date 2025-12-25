"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogAction } from "@/app/actions/blogActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; 

export default function DeleteButton({ blogId }: { blogId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setIsDeleting(true);
    // Call Delete server action
    const result = await deleteBlogAction(blogId);

    if (result.success) {
      router.push("/dashboard");
    } else {
      alert("Error: Could not delete.");
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="flex gap-2"
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? "Deleting..." : "Delete Blog"}
    </Button>
  );
}
"use server";

import prisma from "@/lib/db"; 
import { auth } from "@clerk/nextjs/server"; 
import { revalidatePath } from "next/cache";

// Create Blog Action
export async function createBlogAction(title: string, content: string) {
  try {
    const { userId } = await auth(); 

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const newBlog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        userId: userId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true, blogId: newBlog.id };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save blog" };
  }
}

// Delete Blog Action
export async function deleteBlogAction(blogId: string) {
  try {
    const { userId } = await auth(); // Security check

    if (!userId) {
      return { error: "Not authorized" };
    }

    await prisma.blog.delete({ 
      where: { 
        id: blogId,
        userId: userId 
      },
    });

    revalidatePath("/dashboard");
    return { success: true }; 
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Failed deleting blog" };
  }
}
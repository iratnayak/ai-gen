"use server";

import prisma from "@/lib/db"; // Db connection
import { auth } from "@clerk/nextjs/server"; // Clerk login
import { revalidatePath } from "next/cache";

// Create Bolg Action
export default async function createBlogAction(title: string, content: string) {
  try {
    const { userId } = await auth(); // Checked Loged user

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

    // Refersh the both pages that's why new data display
    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true, blogId: newBlog.id };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save blog" };
  }
}

// Create Delete Action
export async function deleteBlogAction(blogId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Delete from databse
    await prisma.blog.delete({
      where: {
        id: blogId,
        userId: userId, // Only can delete own blogs
      },
    });

    // Refersh the both pages that's why clear delete data
    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Failed to delete" };
  }
}

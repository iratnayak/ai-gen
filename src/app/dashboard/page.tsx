import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratorForm from "@/components/GeneratorForm";
import prisma from "@/lib/db";
import BlogList from "@/components/BlogList"; 

export const dynamic = "force-dynamic";

export default async function Dashboard() {
 
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    redirect("/");
  }

 
  const recentBlogs = await prisma.blog.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    take: 10, 
  });

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-green-800">
          Hello, {user.firstName}! 👋
        </h1>
        <UserButton />
      </div>

      <GeneratorForm />


      <div className="mt-12 p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Recent Generations</h2>
        <BlogList initialBlogs={recentBlogs} />
      </div>
    </div>
  );
}
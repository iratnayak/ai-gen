import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratorForm from "@/components/GeneratorForm";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Suggested user
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    redirect("/");
  }

  // 2. get the datas from the db only for current user's db
  const recentBlogs = await prisma.blog.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    take: 5, // Display last 5
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

      {/* 3. Dynamic Recent Generations කොටස */}
      <div className="mt-12 p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Recent Generations</h2>

        {recentBlogs.length === 0 ? (
          <p className="text-gray-400 italic">No blogs generated yet.</p>
        ) : (
          <div className="grid gap-4">
            {recentBlogs.map((blog) => (
              <Link
                href={`/blog/${blog.id}`}
                key={blog.id}
                className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
              >
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-green-500 font-bold opacity-0 group-hover:opacity-100 transition">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

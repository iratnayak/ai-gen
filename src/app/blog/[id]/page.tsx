import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { id } = await params;

  // 2. Serching bolg in to database
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  // 3. Dispaly error 404
  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 min-h-screen bg-white shadow-sm border rounded-xl mt-10 mb-20">
      {/* Back Button */}
      <div className="mb-10">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-gray-500 hover:text-blue-600">
            ← Back to Dashboard
          </Button>
        </Link>
        <DeleteButton blogId={blog.id} />
      </div>

      <article className="prose prose-blue max-w-none">
        {/* Blog title */}
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
          {blog.title}
        </h1>

        {/* Discription */}
        <div className="flex items-center text-sm text-gray-400 mb-10 border-b pb-6">
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold mr-4">
            AI Generated
          </div>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Blog's Content */}
        <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
          {blog.content}
        </div>
      </article>

      {/* Footer Disclaimer */}
      <div className="mt-20 pt-10 border-t border-gray-100 italic">
        <p className="text-gray-400 text-sm text-center">
          This blog post was generated using artificial intelligence and may
          contain inaccuracies.
        </p>
      </div>
    </div>
  );
}

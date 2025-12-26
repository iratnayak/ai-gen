'use client';

import { useOptimistic, useTransition } from 'react';
import { deleteBlogAction } from '@/app/actions/blogActions';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react'; // Icons

export default function BlogList({ initialBlogs }: { initialBlogs: any[] }) {
  const [isPending, startTransition] = useTransition();

  const [optimisticBlogs, removeOptimisticBlog] = useOptimistic(
    initialBlogs,
    (state, blogId: string) => state.filter((blog) => blog.id !== blogId)
  );

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      removeOptimisticBlog(id);
      const result = await deleteBlogAction(id);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  if (optimisticBlogs.length === 0) {
    return <p className="text-gray-400 italic">No blogs generated yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {optimisticBlogs.map((blog) => (
        <div 
          key={blog.id} 
          className="relative flex items-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
        >
          
          <Link
            href={`/blog/${blog.id}`}
            className="flex-1 p-4 pr-16" 
          >
            <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition">
              {blog.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </Link>

         
          <button
            onClick={(e) => {
              e.preventDefault(); 
              handleDelete(blog.id);
            }}
            disabled={isPending}
            className="absolute right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Delete Blog"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
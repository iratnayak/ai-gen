import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratorForm from "@/components/GeneratorForm";
import Link from "next/link";

export default async function Dashboard() {
   
    // Get the authenticated user
   const user = await currentUser();
   const { userId } = await auth();

   // If user is not logged in, redirect to home (Extra security)
   if (!userId || !user) {
    redirect("/");
  }
  return (
    <div className="p-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-green-800">
            Hello, {user.firstName}! 
        </h1>
        <UserButton />
      </div>
      <GeneratorForm />

      <div className="mt-12 p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
        Recent Generations
        </h2>
        <Link href={`/blog/isuru-blog-test-1`} className="inline-block px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md">
        View Last Generated Blog
        </Link>
        <p className="mt-2 text-sm text-gray-500 italic">

        </p>
      </div>
    </div>
  );
    
}
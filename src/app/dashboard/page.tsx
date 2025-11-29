import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratorForm from "@/components/GeneratorForm";

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
    </div>
  );
    
}
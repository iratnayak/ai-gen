import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return(
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-purple-700  mb-4">AI-Gen 🧠</h1>
      <p className="text-gray-500 mb-8">Create content with the power of AI</p>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Get Started (Login)</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center gap-4">
            <Link href="/dashboard">
                <Button>Go to Dashboard! </Button>
            </Link>
            
            <div className="mt-4">
                <UserButton /> 
            </div>
        </div>
      </SignedIn>
      </div>
  );
}
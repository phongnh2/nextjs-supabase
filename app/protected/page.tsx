"use server";

import { Button } from "@nextui-org/react";
import { InfoIcon } from "lucide-react";
import { signOutAction } from "../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignOutExample from "@/components/auth-pages/sign-out-example";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="grid grid-cols-8 gap-20">
      <div className="col-span-4 flex-1 w-full flex flex-col gap-12">
        <div className="w-full">
          <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} />
            This is a protected page that you can only see as an authenticated
            user
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
          <form action={signOutAction}>
            <Button type="submit" variant="faded">
              Sign out
            </Button>
          </form>
        </div>
      </div>
      <div className="col-span-4">
        <h1 className="text-3xl font-bold">Preview code</h1>
        <SignOutExample />
      </div>
    </div>
  );
}

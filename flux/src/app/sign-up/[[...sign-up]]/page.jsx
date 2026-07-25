import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black ">
<SignUp
  routing="path"
  path="/sign-up"
  afterSignUpUrl="/dashboard"
/>
    </div>
  );
}
import { AuthButton } from '../../components/AuthButton';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <AuthButton mode="signup" />
    </div>
  );
}

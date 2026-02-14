import { AuthButton } from '../../components/AuthButton';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Login</h1>
      <AuthButton mode="login" />
    </div>
  );
}

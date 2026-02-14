import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">TopperFlow: AI Study Planner</h1>
      <p className="mx-auto max-w-2xl text-slate-600">Plan your preparation, track revisions, discover weak topics, and upgrade for premium analytics.</p>
      <div className="flex justify-center gap-4">
        <Link href="/signup" className="rounded bg-indigo-600 px-4 py-2 text-white">Get Started</Link>
        <Link href="/pricing" className="rounded border px-4 py-2">View Pricing</Link>
      </div>
    </section>
  );
}

import { UpgradeButton } from '../../components/UpgradeButton';

export default function PricingPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded border bg-white p-6">
        <h2 className="text-xl font-semibold">Free</h2>
        <p className="text-3xl font-bold">$0</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>Basic planner generation</li>
          <li>Starter analytics</li>
        </ul>
      </article>
      <article className="rounded border-2 border-indigo-600 bg-white p-6">
        <h2 className="text-xl font-semibold">Pro</h2>
        <p className="text-3xl font-bold">$9/mo</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>Advanced analytics</li>
          <li>Priority reminders</li>
          <li>Unlimited study plans</li>
        </ul>
        <div className="mt-4"><UpgradeButton /></div>
      </article>
    </section>
  );
}

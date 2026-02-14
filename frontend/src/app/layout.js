import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'TopperFlow',
  description: 'AI study planner and analytics platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

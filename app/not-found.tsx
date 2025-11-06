import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[#0A3C5F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="rounded-2xl">Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}


import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">Craft.js Next.js Builder</h1>
      <p className="text-slate-700">Open the builder route to start dragging components.</p>
      <Link
        href="/builder"
        className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Go to /builder
      </Link>
    </main>
  );
}

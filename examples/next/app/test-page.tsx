export default function TestPage() {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Test Page</h1>
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        Basic Tailwind Test
      </div>
      <div className="mt-4 bg-red-500 text-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
        Custom Shadow Test
      </div>
    </div>
  );
}
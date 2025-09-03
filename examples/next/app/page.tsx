import WorkingTestimonials from '../../../src/components/WorkingTestimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="py-8 px-4 text-center bg-transparent">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Testimonials Component Demo</h1>
        <p className="text-slate-600">
          Testing component with default data
        </p>
      </div>
      <WorkingTestimonials />
    </main>
  );
}
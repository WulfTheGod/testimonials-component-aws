'use client';

import { useEffect, useState } from 'react';
import WorkingTestimonials from '../../../src/components/WorkingTestimonials';
import type { Review } from '../../../src/types/review';

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For static export, directly import mock data
    // In production, this would fetch from AWS Lambda or API Gateway
    import('../../../src/mock/reviews.json')
      .then(module => {
        setReviews(module.default.reviews);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load testimonials');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Error loading testimonials</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">AWS Interview Demo</span>
            <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Testimonials Component
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Production-ready React component with AWS integration capabilities
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">TypeScript</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">React 18</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Next.js 14</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">AWS Lambda Ready</span>
            </div>
          </div>

          <div className="text-sm text-blue-200">
            Showing {reviews.length} customer reviews • Google Business Profile Integration
          </div>
        </div>
      </div>

      {/* AWS Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AWS Integration Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Lambda Function</h3>
              <p className="text-gray-600 text-sm">
                Serverless handler included for fetching and caching Google Reviews via AWS Lambda
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                examples/aws-lambda/handler.ts
              </code>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">API Gateway Ready</h3>
              <p className="text-gray-600 text-sm">
                RESTful endpoint design with proper error handling and response formatting
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                GET /testimonials
              </code>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">CloudFront Compatible</h3>
              <p className="text-gray-600 text-sm">
                Static export with cache headers configured for CDN distribution
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                Cache-Control: s-maxage=300
              </code>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Deployment Options:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AWS Amplify with CI/CD pipeline</li>
              <li>• S3 + CloudFront for static hosting</li>
              <li>• ECS/Fargate for containerized deployment</li>
              <li>• Elastic Beanstalk for managed infrastructure</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Component */}
      <div className="pb-16">
        <WorkingTestimonials reviews={reviews} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-2">
            Created by Dakota Kelly for AWS Interview
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a 
              href="https://github.com/WulfTheGod/testimonials-component-aws" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="https://wulfthegod.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
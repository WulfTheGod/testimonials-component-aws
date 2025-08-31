"use client";

import { motion } from "framer-motion";
import CarouselContainer from "./CarouselContainer";
import type { Review } from "../types/review";

interface TestimonialsProps {
  reviews?: Review[];
}

export default function Testimonials({ reviews = [] }: TestimonialsProps) {

  // Default fallback testimonials if none are provided
  const fallbackTestimonials = [
    {
      id: "fallback-1",
      name: "Sarah J.",
      role: "Homeowner",
      content: "Exceptional service! The team was professional and delivered exactly what we needed on time.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff&size=100&bold=true&format=png",
      location: "Montreal, QC",
      project: "Kitchen Renovation",
      source: "google"
    },
    {
      id: "fallback-2", 
      name: "Michael C.",
      role: "Property Manager",
      content: "Outstanding work! They transformed our business processes and exceeded all expectations. Highly recommend for any organization looking to modernize.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=MC&background=10b981&color=fff&size=100&bold=true&format=png",
      location: "Mississauga, ON",
      source: "google"
    },
    {
      id: "fallback-3",
      name: "Emily R.", 
      role: "Homeowner",
      content: "Great experience working with this team. Good communication throughout the project.",
      rating: 4,
      image: "https://ui-avatars.com/api/?name=ER&background=8b5cf6&color=fff&size=100&bold=true&format=png",
      location: "Quebec City, QC",
      project: "Bathroom Renovation",
      source: "google"
    }
  ];

  const testimonialsToShow = reviews && reviews.length > 0 ? reviews : fallbackTestimonials;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Server rendered for SEO - More subtle and proportionate */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-slate-700/10 to-emerald-100/80 text-slate-700 font-semibold rounded-full text-sm mb-4 shadow-sm">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-700 mb-4 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Hear from satisfied clients who have experienced the ToughJobs difference firsthand.
          </p>
        </div>

        {/* Carousel - Client component for interactivity */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { duration: 0.6 }
          }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <CarouselContainer 
            testimonials={testimonialsToShow}
            autoScrollInterval={6000}
            pauseOnHover={true}
          />
        </motion.div>

        {/* Leave a Review CTA Section - Compact */}
        <div className="mt-6 text-center">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-6"></div>
          
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h3 className="text-xl font-bold text-slate-700">Love Our Work?</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Share your experience and help other homeowners find us
            </p>
            
            <a
              href="https://g.page/r/Cfq7RASC6qOdEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span>Leave us a Review</span>
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
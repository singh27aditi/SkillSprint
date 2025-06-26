"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { SignUp } from "@clerk/clerk-react";

const dummyCourses = [
  {
    name: 'Full Stack Web Development',
    description: 'Learn to build modern web applications using React, Node.js, and more.',
    id: 'web-dev',
  },
  {
    name: 'Data Science & AI',
    description: 'Master data analysis, machine learning, and AI tools from scratch.',
    id: 'data-science',
  },
  {
    name: 'UI/UX Design',
    description: 'Design beautiful, user-friendly interfaces and experiences.',
    id: 'ui-ux',
  },
];

const stats = [
  { label: 'Learners', value: '10,000+' },
  { label: 'Courses', value: '50+' },
  { label: 'Avg. Rating', value: '4.9/5' },
];

const testimonials = [
  {
    name: 'Aditi S.',
    text: 'This platform made learning so much fun and effective! The AI-generated content is spot on.',
  },
  {
    name: 'Rahul M.',
    text: 'I landed my dream job after completing the Full Stack course. Highly recommended!',
  },
  {
    name: 'Priya K.',
    text: 'The community support and hands-on projects set this platform apart from the rest.',
  },
];

const faqs = [
  {
    q: 'How do I enroll in a course?',
    a: 'Simply sign up, browse our courses, and click the Enroll button on any course page.',
  },
  {
    q: 'Are the courses free?',
    a: 'Many courses are free! Some premium content may require a subscription.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Absolutely! All courses are self-paced and accessible anytime, anywhere.',
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 text-center transition-all duration-500 border border-gray-200 dark:border-gray-800">
        <div className="text-3xl mb-4">“</div>
        <p className="text-lg italic mb-2 text-gray-700 dark:text-gray-200">{testimonials[index].text}</p>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{testimonials[index].name}</span>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border border-gray-400 ${i === index ? 'bg-gray-800 dark:bg-gray-100' : 'bg-gray-300 dark:bg-gray-700'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800">
        {/* App Name and Tagline */}
        <div className="mb-2">
          <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">SkillSprint</span>
        </div>
        <div className="mb-6">
          <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium">Accelerate your growth. Master new skills, faster.</span>
        </div>
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Empower Your Learning Journey</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">Discover, enroll, and master new skills with our streamlined, AI-powered online courses.</p>
        <Link href="/sign-up">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow">Get Started</Button>
        </Link>
      </section>

      {/* Stats Bar */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-wrap justify-center gap-8 border-b border-gray-200 dark:border-gray-800">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-10 border-b border-gray-200 dark:border-gray-800">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800">
          <span className="text-2xl mb-3">🧠</span>
          <h3 className="font-bold text-lg mb-2">Personalized Learning</h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">AI-generated course content tailored to your goals and pace.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800">
          <span className="text-2xl mb-3">💻</span>
          <h3 className="font-bold text-lg mb-2">Hands-on Projects</h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">Build real-world projects and showcase your skills to employers.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800">
          <span className="text-2xl mb-3">🤝</span>
          <h3 className="font-bold text-lg mb-2">Community Support</h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">Join a vibrant community of learners and mentors for guidance.</p>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {dummyCourses.map((course) => (
            <div key={course.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-start">
              <h3 className="font-bold text-lg mb-2">{course.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 flex-1 mb-4">{course.description}</p>
              <Link href="/auth/sign-up">
                <Button variant="outline" className="w-full">Enroll Now</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="max-w-3xl mx-auto px-4 py-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Our Learners Say</h2>
        <TestimonialCarousel />
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Stay Updated!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Subscribe to our newsletter for the latest courses and offers.</p>
        <form className="flex flex-col sm:flex-row gap-3 justify-center">
          <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100" />
          <Button type="submit" className="px-6">Subscribe</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Online Learning Platform. All rights reserved.
      </footer>
    </main>
  );
}

// src/components/landing-sections/TestimonialsSection.js
import React from 'react';
import { QuoteIcon, GithubBadgeIcon, getImageUrl } from './UtilityIcons'; 

export default function TestimonialsSection() {
    const testimonials = [
        { quote: "Finding a mentor here was a game-changer. I went from struggling with pull requests to becoming a core contributor on a project I love.", name: "Alex Johnson", role: "Mentee", avatar: getImageUrl('face5') },
        { quote: "The platform's smart matching is brilliant. It connected me with a student who was passionate about the exact technologies I specialize in. It's been incredibly rewarding.", name: "Samantha Lee", role: "Mentor", avatar: getImageUrl('face3') },
        { quote: "As someone new to open source, the guidance I received was invaluable. The group sessions are fantastic for learning from different perspectives.", name: "David Chen", role: "Mentee", avatar: getImageUrl('face4') }
    ];

    return (
        <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Real Stories, Real Growth
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    See how our community is making an impact in open source.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between transition duration-300 hover:border-teal-500 hover:shadow-teal-300/50">
                        <div>
                            <QuoteIcon />
                            <blockquote className="mt-6 text-gray-700 text-lg">
                                "{testimonial.quote}"
                            </blockquote>
                        </div>
                        <div className="mt-8 flex items-center">
                            <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                            <div className="ml-4">
                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <div className="inline-flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full py-3 px-6 transition duration-300 hover:border-gray-900">
                    <GithubBadgeIcon className="text-gray-600 w-6 h-6" />
                    <span className="ml-3 text-md font-semibold text-gray-700">Secured with GitHub Sign-In</span>
                </div>
                <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
                    We use your GitHub profile for smart matching and never request access to your code. Your privacy is our priority.
                </p>
            </div>
        </div>
        </div>
    );
}
// src/components/landing-sections/FAQSection.js
import React from 'react';

export default function FAQSection() {
    const faqs = [
        { question: "How is my role (Mentor or Student) assigned?", answer: "Your role is automatically suggested based on your GitHub activity. We analyze factors like your contribution history, repository ownership, and issue/PR interactions. You can always review and finalize your role during onboarding." },
        { question: "How does the matching process work?", answer: "Our smart matching algorithm connects students with mentors based on shared technical skills, learning goals, and language preferences. We analyze your GitHub profile to find the most relevant and impactful match for you." },
        { question: "How are mentorship sessions scheduled?", answer: "Once a mentorship request is accepted, you and your mentor/student can coordinate a suitable time directly through our 1-on-1 chat feature. Mentors can also post availability for group sessions in the relevant discussion rooms." },
        { question: "Is my data secure?", answer: "Absolutely. We use GitHub for authentication only and never request access to your private repositories or code. Your privacy and data security is our top priority." }
    ];

    return (
        <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Have questions? We've got answers.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="p-6 bg-gray-50 border border-gray-200 rounded-lg transition duration-300 hover:border-teal-400 hover:shadow-teal-300/20">
                            <dt className="text-xl font-semibold text-gray-900">
                                {faq.question}
                            </dt>
                            <dd className="mt-3 text-base text-gray-600">
                                {faq.answer}
                            </dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}
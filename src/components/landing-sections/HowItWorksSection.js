// src/components/landing-sections/HowItWorksSection.js
import React from 'react';
import { ImageTag, getImageUrl } from './UtilityIcons'; 

export default function HowItWorksSection() {
    return (
        <div id="process-content" className="w-full">
            <div className="text-center mb-16">
                <p className="text-teal-600 text-sm font-semibold mb-2">THE HATCH PROCESS</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                    Your Hyper-Efficient 3-Step Mentorship System
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                    <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">01</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Insta-Verify</h3>
                    <p className="text-gray-600 text-base mb-4">
                        Login with GitHub. Our system instantly verifies your contribution level to assign your role—**Newcomer** or **Verified Mentor**—so you skip the forms.
                    </p>
                    <p className="text-teal-600 font-semibold">Focus: Smart Role Assignment.</p>
                </div>
                
                <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                    <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">02</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Micro-Match (15min)</h3>
                    <p className="text-gray-600 text-base mb-4">
                        We match Newcomers with **First-Time Guide** Mentors. Submit one specific question for a **15-minute focused session**. No long-term commitments required.
                    </p>
                    <p className="text-teal-600 font-semibold">Focus: High-Quality, Quick Resolution.</p>
                </div>
                
                <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                    <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">03</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Launch Your PR</h3>
                    <p className="text-gray-600 text-base mb-4">
                        Mentor accepts. Contact info is shared. Get your blocker solved, confidently push your first contribution, and accelerate your growth in the Open Source world.
                    </p>
                    <p className="text-teal-600 font-semibold">Focus: Successful Contribution.</p>
                </div>
            </div>
            
            <div className="mt-16 w-full h-[400px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 transition duration-300 hover:shadow-teal-400/40">
                <ImageTag src={getImageUrl('steps_image')} alt="Workflow Image" className="w-full h-full" />
            </div>
        </div>
    );
}
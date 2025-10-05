// src/app/landing/page.tsx

'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// --- CORRECTED IMPORTS: Pointing to src/components/landing-sections/ ---
// Assuming you moved all the component code blocks (HeroSection, Footer, etc.) 
// into their own files within the same directory: src/components/landing-sections/

// We use relative path notation for the components: @/components/...
import { GitHubIcon, ImageTag, getImageUrl } from '@/components/landing-sections/UtilityIcons';
import HeroSection from '@/components/landing-sections/HeroSection';
import RoleDiscoverySection from '@/components/landing-sections/RoleDiscoverySection';
import HowItWorksSection from '@/components/landing-sections/HowItWorksSection';
import DashboardPreviewSection from '@/components/landing-sections/DashboardPreviewSection';
import ChatFeatureSection from '@/components/landing-sections/ChatFeatureSection';
import TestimonialsSection from '@/components/landing-sections/TestimonialsSection';
import FAQSection from '@/components/landing-sections/FAQSection';
import Footer from '@/components/landing-sections/Footer';


// --- MAIN LANDING PAGE LOGIC ---
export default function HatchLandingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Core Login Logic (Stays here as it handles routing)
    const handleGitHubLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error('Error logging in:', error);
            setLoading(false);
        }
        // If successful, Supabase will handle the redirect.
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center">
            
            <div className="w-full max-w-7xl px-6">
                
                {/* 1. Hero Section (Includes Navbar/Header) */}
                <HeroSection handleLogin={handleGitHubLogin} loading={loading} />

                {/* 2. Role Discovery Infographic */}
                <section id="role-discovery" className="mt-20">
                    <RoleDiscoverySection />
                </section>
                
                {/* 3. How It Works - 3 Step Process */}
                <section id="process" className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <HowItWorksSection />
                </section>

                {/* 4. Dashboard Preview */}
                <section id="dashboard-preview" className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <DashboardPreviewSection onLoginClick={handleGitHubLogin}/>
                </section>

                {/* 5. Chat Feature Showcase */}
                <section id="chat-feature" className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <ChatFeatureSection onLoginClick={handleGitHubLogin} />
                </section>

                {/* 6. Testimonials */}
                <section id="testimonials" className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <TestimonialsSection />
                </section>

                {/* 7. FAQ */}
                <section id="faqs" className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <FAQSection />
                </section>
                
                {/* 8. Final CTA */}
                <div className="mt-20 text-center p-10 bg-gray-50 rounded-xl border border-teal-300 transition duration-300 hover:shadow-teal-300/50 hover:border-teal-400">
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to **Hatch** your first contribution?</h3>
                    <button
                        onClick={handleGitHubLogin}
                        className="px-8 py-4 text-xl font-bold rounded-full transition duration-300 bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 shadow-xl shadow-teal-500/40"
                    >
                        Start Your Open Source Journey Today!
                    </button>
                </div>
            </div>
            
            {/* 9. Footer */}
            <Footer />
        </div>
    );
}
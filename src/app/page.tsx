import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { ProgramsSection } from '@/components/home/programs-section'
import { TrainersSection } from '@/components/home/trainers-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CTASection } from '@/components/home/cta-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProgramsSection />
      <TrainersSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

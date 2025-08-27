import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import { AnimatedCard, CardTitle, Visual3, CardVisual, CardBody, CardDescription } from './ui/animated-card'

export default function FeaturesSection() {
    return (
        <section className="overflow-hidden py-16 md:py-32">
            
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-semibold lg:text-5xl">Built for Growing Businesses</h2>
                    <p className="mt-6 text-lg">Empower your business with advanced automation, CRM, and marketing tools that scale with your growth. Go beyond GoHighLevel with our enhanced features.</p>
                </div>
                <div className="relative -mx-4 rounded-3xl p-3 md:-mx-12 lg:col-span-3">
                    <div className="perspective-midrange">
                        <div className="rotate-x-6 -skew-2">
                            <div className="aspect-88/36 relative">
                                <div className=""></div>
                                    {/* <Image src="/map.png" className="absolute inset-0 z-10" alt="payments illustration dark" width={2797} height={1137} /> */}
                                    <Image src="/hero.png" className="hidden dark:block rounded-2xl bg-radial-[at_75%_25%] to-background z-1 -inset-17 absolute from-transparent to-75%" alt="payments illustration dark" width={2797} height={1137} />
                                    <Image src="/hero.png" className="dark:hidden bg-radial-[at_75%_25%] to-background z-1 -inset-17 absolute from-transparent to-75%" alt="payments illustration light" width={2797} height={1137} />
                                </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Advanced Automation</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Powerful workflow automation that saves hours of manual work and increases efficiency.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Smart CRM</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Intelligent customer relationship management with AI-powered lead scoring and insights.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Enterprise Security</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Bank-level security with advanced encryption and compliance for your business data.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">AI-Powered Insights</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Predictive analytics and AI-driven recommendations to optimize your business performance.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
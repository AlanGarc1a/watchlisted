import { Tv, Users, BarChart3, Globe, Star, List } from "lucide-react"
import FeatureCard from "../FeatureCard"
import AIStrip from "./AIStrip"

type Feature = {
    id: number
    icon: React.ReactNode
    iconBg: string
    title: string
    description: string
}

const features: Feature[] = [
        {
            id: 1,
            icon: <Tv className="w-5 h-5 text-violet" />,
            iconBg: 'bg-violet/15',
            title: 'TV episodes tracking',
            description: 'Mark episodes as you go. Never lose your place in a series again'
        },
        {
            id: 2,
            icon: <Users className="w-5 h-5 text-teal" />,
            iconBg: 'bg-teal/15',
            title: 'Social activity feed',
            description: 'Follow friends, see their ratings and reviews in real time.'
        },
        {
            id: 3,
            icon: <BarChart3 className="w-5 h-5 text-gold" />,
            iconBg: 'bg-gold/15',
            title: 'Rich watch stats',
            description: 'Hours, genres, completion rates — understand your taste in data.'
        },
        {
            id: 4,
            icon: <Globe className="w-5 h-5 text-rose" />,
            iconBg: 'bg-rose/15',
            title: 'Where to watch',
            description: 'Streaming availability for your country, powered by TMDB.'
        },
        {
            id: 5,
            icon: <Star className="w-5 h-5 text-brand" />,
            iconBg: 'bg-brand/15',
            title: 'Year in review',
            description: 'Spotify Wrapped-style annual summary. Shareable to socials.'
        },
        {
            id: 6,
            icon: <List className="w-5 h-5 text-violet" />,
            iconBg: 'bg-violet/15',
            title: 'Curated lists',
            description:  "Build and share public lists — 'Best sci-fi of the decade.'"
        }
    ];

const Features = () => {
    return (
        <div>
            <div className="text-center my-8">
                <p className="uppercase text-muted text-xs tracking-widest mb-2">Features</p>
                <h2 className="text-xl font-bold text-primary">Everything Letterboxd isn&apos;t</h2>
            </div>
            {/* features grid */}
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {features.map(feature => (
                    <FeatureCard key={feature.id} {...feature} />
                ))}
            </div>
            {/* AI */}
            <AIStrip />
        </div>
    )
}

export default Features;
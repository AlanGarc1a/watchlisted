
type FeatureCardProps = {
    icon: React.ReactNode
    iconBg: string
    title: string
    description: string
}

const FeatureCard = ({ icon, iconBg, title, description }: FeatureCardProps) => {

    return (
        <div className="border border-raised bg-deep rounded-xl p-4">
            <div className={`rounded-lg ${iconBg} w-8 h-8 flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-sm font-semibold text-primary mb-1">{title}</p>
            <p className="text-xs text-muted leading-relaxed">{description}</p>
        </div>
    )
}

export default FeatureCard;
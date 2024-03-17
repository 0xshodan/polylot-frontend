interface CardTemplateProps {
    className?: string,
    children?: React.ReactNode
}

export default function CardTemplate({className, children}: CardTemplateProps) {
    return <div className={`border bg-violet-main rounded-lg ${className}`}>
        {children}
    </div>
}
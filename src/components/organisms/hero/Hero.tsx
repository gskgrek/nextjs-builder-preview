interface HeroProps {
  title: string
  description?: string
}

export const Hero = (props: HeroProps) => {
  const { title, description } = props
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

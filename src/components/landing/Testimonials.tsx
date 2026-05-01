type TestimonialCard = {
    id: number
    text: string
    bgColor: string
    textColor: string
    name: string
    handle: string
}

const testimonials: TestimonialCard[] = [
    { id: 1, text: "Finally something that handles TV properly. Been waiting for Letterboxd to do this for years", bgColor: 'bg-violet/15', textColor: 'text-violet', name: 'Sara K.', handle: '@sarawatches' },
    { id: 2, text: "I typed 'a sad movie that isn't depressing' and it nailed it. Filters can't do that.", bgColor: 'bg-teal/15', textColor: 'text-teal', name: 'Marcus R.', handle: '@marcusreviews' },
    { id: 3, text: "My Taste DNA said I treat 7/10 as an insult. That is accurate and I'm a little embarrassed.", bgColor: 'bg-gold/15', textColor: 'text-gold', name: 'Priya K.', handle: '@priyafilms' },
];

type TestimonialCardProps = Omit<TestimonialCard, "id">

const TestimonialCard = ({ text, bgColor, textColor, name, handle }: TestimonialCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="border border-raised bg-deep rounded-xl p-6">
      <p className="text-sm text-muted italic mb-4">{text}</p>
      <div className="flex items-center gap-3">
        <div className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${textColor}`}>
          {initials}
        </div>
        <div>
          <p className="font-bold text-primary text-sm">{name}</p>
          <p className="text-xs text-muted">{handle}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
    
    return (
        <div className='px-8 py-10 border-b border-raised'>
            <div className='text-center mb-8'>
                <p className='text-muted tracking-widest uppercase text-xs'>What people are saying</p>
                <h3 className='font-bold text-xl text-primary'>People actually use this</h3>
            </div>
            <div className='grid grid-cols-3 gap-4 mt-6 max-w-4xl mx-auto'>
                {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
            </div>
        </div>
    )
}

export default Testimonials;
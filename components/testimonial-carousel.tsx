import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

interface Testimonial {
  name: string
  role: string
  company: string
  logo: string
  content: string
  rating: number
  image: string
}

const TestimonialCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechFlow Solutions",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "L.U.N.A. transformed how we handle customer support. Our response times have improved by 80%, and our customers love the natural conversations. It's like having a professional support team available 24/7.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "InnovateCorp",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "The AI voice agents from L.U.N.A. handle our appointment scheduling flawlessly. We've reduced no-shows by 60% and saved countless hours on administrative tasks. L.U.N.A. has been a game-changer for our business.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "CTO",
      company: "Digital Health Plus",
      logo: "/placeholder.svg?height=32&width=120",
      content:
        "Integration with L.U.N.A. was seamless, and the results were immediate. Our patient scheduling system now runs autonomously, and the AI handles complex conversations with remarkable accuracy. Highly recommended!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  }

  return (
    <div className="testimonial-carousel">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <div className="testimonial-content">
              <p>{testimonial.content}</p>
            </div>
            <div className="testimonial-author">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                width={60}
                height={60}
                className="testimonial-image"
              />
              <div className="testimonial-info">
                <h3>{testimonial.name}</h3>
                <p className="testimonial-role">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialCarousel


import { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { Slider } from '../components'
import ticketorder from '../assets/ticketorder.webp'
import brandsdef from '../assets/brandsdef.webp'
import ticketbuttons from '../assets/ticketbuttons.webp'
import ticketkwik from '../assets/ticketkwik.webp'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: ticketorder,
    title: 'One ticket per order',
    description: 'Ten separate emails for one simple order — from confirmation to return? That\'s old school. Beeylo brings everything together in one smart overview.'
  },
  {
    id: 2,
    image: brandsdef,
    title: 'Inbox overload done',
    description: 'Every brand you interact with has its own clean hub inside Beeylo. So all your conversations stay exactly where they belong.'
  },
  {
    id: 3,
    image: ticketbuttons,
    title: 'No more switching apps',
    description: 'Beeylo lets you take action the moment you see a message. Return an item, download a receipt, check your warranty, ask a question and all from one place.'
  },
  {
    id: 4,
    image: ticketkwik,
    title: 'No more long emails',
    description: 'Beeylo\'s smart AI summarizes your emails, so you instantly see what matters.'
  }
]

export const FeaturesPage: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesContainerRef = useRef<HTMLDivElement>(null)
  
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }
  
  // Handle wheel events for slide navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default to avoid page scrolling
      e.preventDefault()
      
      // For horizontal navigation, we use deltaX primarily, but also support deltaY
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      
      if (delta > 0) {
        // Scroll right/down - next slide
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))
      } else {
        // Scroll left/up - previous slide
        setCurrentSlide(prev => Math.max(prev - 1, 0))
      }
    }
    
    const container = slidesContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return (
    <div className="page-content features-page">
      <div className="slider-header">
        <Slider 
          slides={slides.length} 
          currentSlide={currentSlide} 
          onSlideChange={handleSlideChange} 
        />
      </div>
      
      <div 
        className="features-slider" 
        ref={slidesContainerRef}
      >
        <div className="slide-container">
          <div 
            className="slides-wrapper"
            style={{ 
              width: `${slides.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / slides.length)}%)`
            }}
          >
            {slides.map((slide) => (
              <div 
                key={slide.id} 
                className="slide"
                style={{ width: `${100 / slides.length}%` }}
              >
                <div className="slide-content">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                </div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
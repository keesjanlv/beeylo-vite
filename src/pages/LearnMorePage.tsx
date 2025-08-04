import { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { NumberedButton, Container, Stack, Card, CardContent, Typography, Button } from '../components/ui'
import { AnimatedInbox, AnimatedEmailList } from '../components'
import { motion, AnimatePresence } from 'framer-motion'
import inboxOverloadImg from '../assets/inboxoverload.webp'
import homeDefImg from '../assets/homedef.webp'
import inbox5Img from '../assets/inbox5.webp'
import ticketOrderImg from '../assets/ticketorder.webp'
import orderSpamImg from '../assets/orderspam.webp'

interface LearnMorePageProps {
  onTabChange: (tab: TabType) => void
}

const slides = [
  {
    id: 1,
    title: "The average person receives 50 emails a day",
    description: "You get 40+ emails a day — but only 4 actually matter. And they get lost in the noise.",
    image: inboxOverloadImg,
    useEmailAnimation: true
  },
  {
    id: 2,
    title: "But needs just 5 of them",
    description: "Beeylo only shows you the 10% that actually matters. The rest? Gone.",
    image: inbox5Img,
    useAnimation: true
  },
  {
    id: 3,
    title: "Beeylo only shows you the 10% that matters",
    description: "Beeylo only shows you the 10% that actually matters. The rest? Gone.",
    image: homeDefImg
  },
  {
    id: 4,
    title: "Nowadays one order turns into 10 different mails",
    description: "Every purchase becomes a flood of confirmations, shipping updates, and promotional follow-ups.",
    image: orderSpamImg
  },
  {
    id: 5,
    title: "With Beeylo, one order is one overview",
    description: "Every update is added to that same view. No more hunting through dozens of emails.",
    image: ticketOrderImg
  }
]

export const LearnMorePage: FC<LearnMorePageProps> = ({ onTabChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [maxTextHeight, setMaxTextHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const textContainerRef = useRef<HTMLDivElement>(null)

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Handle touch events for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Handle keyboard events for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Check if device is mobile and calculate maximum text height for dynamic image sizing
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      return mobile
    }

    const calculateMaxTextHeight = () => {
      const mobile = checkMobile()
      
      // Only calculate height on mobile devices
      if (!mobile || !textContainerRef.current) {
        setMaxTextHeight(0)
        return
      }

      let maxHeight = 0
      const container = textContainerRef.current
      
      // Create a temporary element to measure each title
      const tempElement = document.createElement('div')
      tempElement.style.position = 'absolute'
      tempElement.style.visibility = 'hidden'
      tempElement.style.width = container.offsetWidth + 'px'
      tempElement.className = 'feature-nav-title-container'
      document.body.appendChild(tempElement)

      slides.forEach((slide) => {
        // Create the full structure for accurate measurement
        tempElement.innerHTML = `
          <div class="feature-navigation">
            ${slides.map((_, index) => `<button class="numbered-button ${index === 0 ? 'active' : ''}"></button>`).join('')}
          </div>
          <div class="feature-title-wrapper">
            <h3 class="feature-title text-center-mobile-left-desktop">${slide.title}</h3>
          </div>
          ${slide.id === 5 ? '<button class="buttonv2 learn-more-button-mobile">See benefits</button>' : ''}
        `
        
        const height = tempElement.offsetHeight
        if (height > maxHeight) {
          maxHeight = height
        }
      })

      document.body.removeChild(tempElement)
      setMaxTextHeight(maxHeight)
    }

    // Calculate on mount and window resize
    calculateMaxTextHeight()
    window.addEventListener('resize', calculateMaxTextHeight)
    
    return () => window.removeEventListener('resize', calculateMaxTextHeight)
  }, [])

  const currentSlideData = slides[currentSlide]
  
  return (
    <div 
      className="page-container home-slides"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Container size="lg">
        <Card variant="outline" className="feature-card">
          <CardContent>
            <Stack spacing={6} className="feature-content">
                    <Stack spacing={4} className="feature-text">
                      <div 
                        ref={textContainerRef}
                        className="feature-nav-title-container"
                        style={{ minHeight: isMobile && maxTextHeight > 0 ? `${maxTextHeight}px` : 'auto' }}
                      >
                        <div className="feature-navigation">
                          {slides.map((_, index) => (
                            <NumberedButton
                              key={index}
                              number={index + 1}
                              active={currentSlide === index}
                              onClick={() => handleSlideChange(index)}
                            />
                          ))}
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0.7, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0.7, x: -10 }}
                            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            className="feature-title-wrapper"
                          >
                            <Typography variant="h3" className="feature-title text-center-mobile-left-desktop">{currentSlideData.title}</Typography>
                          </motion.div>
                        </AnimatePresence>
                        {/* Show button on desktop only for last slide - now inside container */}
                        {currentSlide === 4 && (
                          <Button 
                            variant="primary"
                            onClick={() => onTabChange('benefits')}
                            className="buttonv2 learn-more-button-desktop"
                          >
                            See benefits
                          </Button>
                        )}
                      </div>
                    </Stack>
                    <div 
                      className="feature-image"
                      style={isMobile && maxTextHeight > 0 ? { 
                        height: `calc(100vh - ${maxTextHeight + 120}px)`,
                        minHeight: '250px',
                        maxHeight: '500px'
                      } : {}}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`image-${currentSlide}`}
                          initial={{ opacity: 0.7, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0.7, x: -10 }}
                          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {currentSlideData.useAnimation ? (
                            <AnimatedInbox 
                              autoStart={currentSlide === 1} 
                              className="feature-animation" 
                            />
                          ) : currentSlideData.useEmailAnimation ? (
                            <AnimatedEmailList 
                              autoStart={currentSlide === 0} 
                              className="feature-animation" 
                            />
                          ) : (
                            <img 
                              src={currentSlideData.image} 
                              alt={currentSlideData.title} 
                              className="feature-img" 
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Show button on mobile under the image for last slide */}
                    {currentSlide === 4 && (
                      <div className="learn-more-button-mobile">
                        <Button 
                          variant="primary"
                          onClick={() => onTabChange('benefits')}
                          className="buttonv2"
                        >
                          See benefits
                        </Button>
                      </div>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Container>
    </div>
  )
}
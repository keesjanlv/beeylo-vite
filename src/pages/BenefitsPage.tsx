import { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { TabType } from '../types'
import { NumberedButton, Container, Stack, Card, CardContent, Typography, Button } from '../components/ui'
import { motion, AnimatePresence } from 'framer-motion'
import ticketOrderImg from '../assets/ticketorder.webp'
import brandsDefImg from '../assets/brandsdef.webp'
import ticketButtonsImg from '../assets/ticketbuttons.webp'
import ticketKwikImg from '../assets/ticketkwik.webp'

interface Feature {
  id: number
  image: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    id: 1,
    image: brandsDefImg,
    title: 'Inbox overload done',
    description: 'Every brand you interact with has its <strong>own clean hub</strong> inside Beeylo.'
  },
  {
    id: 2,
    image: ticketButtonsImg,
    title: 'No more switching apps',
    description: '<strong>Return</strong> an item, <strong>download</strong> a receipt, <strong>check</strong> your warranty, <strong>ask</strong> a question and all from <strong>one place</strong>.'
  },
  {
    id: 3,
    image: ticketOrderImg,
    title: 'One order, one overview',
    description: 'Beeylo brings every message together in <strong>one smart overview</strong>.'
  },
  {
    id: 4,
    image: ticketKwikImg,
    title: 'No more long emails',
    description: 'Beeylo\'s smart AI summarizes your emails, so you <strong>instantly see what matters</strong>.'
  }
]

interface BenefitsPageProps {
  onTabChange: (tab: TabType) => void
}

export const BenefitsPage: FC<BenefitsPageProps> = ({ onTabChange }) => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [maxTextHeight, setMaxTextHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const textContainerRef = useRef<HTMLDivElement>(null)
  
  const handleFeatureChange = (index: number) => {
    setCurrentFeature(index)
  }

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
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
      nextFeature()
    }
    if (isRightSwipe) {
      prevFeature()
    }
  }

  // Handle keyboard events for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevFeature()
      } else if (e.key === 'ArrowRight') {
        nextFeature()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle mouse wheel for desktop
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) {
        e.preventDefault()
        if (wheelEvent.deltaX > 0) {
          nextFeature()
        } else {
          prevFeature()
        }
      }
    }

    const container = document.querySelector('.benefits-page')
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
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

      features.forEach((feature) => {
        // Create the full structure for accurate measurement
        tempElement.innerHTML = `
          <div class="feature-navigation">
            ${features.map((_, index) => `<button class="numbered-button ${index === 0 ? 'active' : ''}"></button>`).join('')}
          </div>
          <div class="feature-title-wrapper">
            <h3 class="feature-title text-center-mobile-left-desktop">${feature.title}</h3>
          </div>
          <div class="feature-description-wrapper">
            <p class="feature-description text-center-mobile-left-desktop">${feature.description}</p>
          </div>
          ${feature.id === 4 ? '<button class="buttonv2 learn-more-button-mobile">Our story</button>' : ''}
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

  const currentFeatureData = features[currentFeature]

  return (
    <div 
      className="page-container benefits-page"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Container size="lg">
        <Card variant="outline" className="feature-card">
          <CardContent>
            <Stack spacing={6} className="feature-content">
                    <div className="feature-text">
                      <div 
                        ref={textContainerRef}
                        className="feature-nav-title-container"
                        style={{ minHeight: isMobile && maxTextHeight > 0 ? `${maxTextHeight}px` : 'auto' }}
                      >
                        <div className="feature-navigation">
                          {features.map((_, index) => (
                            <NumberedButton
                              key={index}
                              number={index + 1}
                              active={currentFeature === index}
                              onClick={() => handleFeatureChange(index)}
                            />
                          ))}
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`title-${currentFeature}`}
                            initial={{ opacity: 0.7, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0.7, x: -10 }}
                            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            className="feature-title-wrapper"
                          >
                            <Typography variant="h3" className="feature-title text-center-mobile-left-desktop">{currentFeatureData.title}</Typography>
                          </motion.div>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`description-${currentFeature}`}
                            initial={{ opacity: 0.7, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0.7, x: -10 }}
                            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1], delay: 0.03 }}
                            className="feature-description-wrapper"
                          >
                            <Typography variant="body" color="secondary" className="feature-description text-center-mobile-left-desktop" dangerouslySetInnerHTML={{ __html: currentFeatureData.description }} />
                          </motion.div>
                        </AnimatePresence>
                        {/* Show button on desktop only for last slide - now inside container */}
                        {currentFeature === 3 && (
                          <Button 
                            variant="primary"
                            onClick={() => onTabChange('about')}
                            className="buttonv2 learn-more-button-desktop"
                          >
                            Our story
                          </Button>
                        )}
                      </div>
                    </div>
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
                          key={`image-${currentFeature}`}
                          initial={{ opacity: 0.7, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0.7, x: -10 }}
                          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <img 
                            src={currentFeatureData.image} 
                            alt={currentFeatureData.title} 
                            className="feature-img" 
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Show button on mobile under the image for last slide */}
                    {currentFeature === 3 && (
                      <div className="learn-more-button-mobile">
                        <Button 
                          variant="primary"
                          onClick={() => onTabChange('about')}
                          className="buttonv2"
                        >
                          Our story
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
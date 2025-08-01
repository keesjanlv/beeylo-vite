import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { NumberedButton, Container, Stack, Card, CardContent, Typography } from '../components/ui'
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
    description: 'Every brand you interact with has its <strong>own clean hub</strong> inside Beeylo. So <strong>all your conversations</strong> stay exactly <strong>where they belong</strong>.'
  },
  {
    id: 2,
    image: ticketButtonsImg,
    title: 'No more switching apps',
    description: 'Beeylo lets you <strong>take action</strong> the moment you see a message. <strong>Return</strong> an item, <strong>download</strong> a receipt, <strong>check</strong> your warranty, <strong>ask</strong> a question and all from <strong>one place</strong>.'
  },
  {
    id: 3,
    image: ticketKwikImg,
    title: 'No more long emails',
    description: 'Beeylo\'s smart AI summarizes your emails, so you <strong>instantly see what matters</strong>.'
  },
  {
    id: 4,
    image: ticketOrderImg,
    title: 'One ticket per order',
    description: 'Ten separate emails for one simple order — from confirmation to return? That\'s old school. <strong>Beeylo brings everything together in one smart overview</strong>.'
  }
]

interface BenefitsPageProps {
  // No props needed
}

export const BenefitsPage: FC<BenefitsPageProps> = () => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
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
                    <Stack spacing={4} className="feature-text">
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
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.225, ease: [0.4, 0.0, 0.2, 1] }}
                        >
                          <Typography variant="h3" className="feature-title text-center-mobile-left-desktop">{currentFeatureData.title}</Typography>
                        </motion.div>
                      </AnimatePresence>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`description-${currentFeature}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.225, ease: [0.4, 0.0, 0.2, 1], delay: 0.05 }}
                        >
                          <Typography variant="body" color="secondary" className="feature-description text-center-mobile-left-desktop" dangerouslySetInnerHTML={{ __html: currentFeatureData.description }} />
                        </motion.div>
                      </AnimatePresence>
                    </Stack>
                    <div className="feature-image">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`image-${currentFeature}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.225, ease: [0.4, 0.0, 0.2, 1] }}
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
                  </Stack>
                </CardContent>
              </Card>
            </Container>
    </div>
  )
}
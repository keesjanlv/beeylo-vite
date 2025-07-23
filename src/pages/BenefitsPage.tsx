import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { NumberedButton, Container, Stack, Card, CardContent } from '../components/ui'
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
    image: ticketOrderImg,
    title: 'One ticket per order',
    description: 'Ten separate emails for one simple order — from confirmation to return? That\'s old school. Beeylo brings everything together in one smart overview.'
  },
  {
    id: 2,
    image: brandsDefImg,
    title: 'Inbox overload done',
    description: 'Every brand you interact with has its own clean hub inside Beeylo. So all your conversations stay exactly where they belong.'
  },
  {
    id: 3,
    image: ticketButtonsImg,
    title: 'No more switching apps',
    description: 'Beeylo lets you take action the moment you see a message. Return an item, download a receipt, check your warranty, ask a question and all from one place.'
  },
  {
    id: 4,
    image: ticketKwikImg,
    title: 'No more long emails',
    description: 'Beeylo\'s smart AI summarizes your emails, so you instantly see what matters.'
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
      className="page-content benefits-page"
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
                <h2 className="text-2xl font-bold feature-title">{currentFeatureData.title}</h2>
                <p className="text-secondary feature-description">{currentFeatureData.description}</p>
              </Stack>
              <div className="feature-image">
                <img 
                  src={currentFeatureData.image} 
                  alt={currentFeatureData.title} 
                  className="feature-img" 
                />
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
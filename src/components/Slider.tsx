import { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'

interface SliderProps {
  slides: number
  currentSlide: number
  onSlideChange: (index: number) => void
}

export const Slider: FC<SliderProps> = ({ slides, currentSlide, onSlideChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentDragPosition = useRef(0)
  
  // Handle click on slider points
  const handlePointClick = (index: number) => {
    onSlideChange(index)
  }

  // Handle mouse down on thumb or bar for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    
    isDragging.current = true
    startX.current = e.clientX
    currentDragPosition.current = e.clientX
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none'
  }

  // Handle touch start on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    
    isDragging.current = true
    startX.current = e.touches[0].clientX
    currentDragPosition.current = e.touches[0].clientX
    
    // Prevent scrolling during swipe
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !sliderRef.current) return
      
      const sliderWidth = sliderRef.current.offsetWidth
      const slideWidth = sliderWidth / (slides - 1)
      const deltaX = e.clientX - currentDragPosition.current
      currentDragPosition.current = e.clientX
      
      // Calculate position change based on drag movement
      const positionChange = deltaX / slideWidth
      
      // Accumulate drag movement
      const totalDeltaX = e.clientX - startX.current
      
      // Move thumb during dragging for visual feedback
      if (thumbRef.current) {
        const currentPosition = (currentSlide / (slides - 1)) * 100
        const newPosition = Math.max(0, Math.min(100, currentPosition + (deltaX / sliderWidth) * 100))
        thumbRef.current.style.left = `${newPosition}%`
      }
      
      // Calculate new slide based on significant drag distance
      if (Math.abs(totalDeltaX) > slideWidth / 4) {
        const newSlide = totalDeltaX > 0 
          ? Math.max(0, currentSlide - 1)
          : Math.min(slides - 1, currentSlide + 1)
        
        onSlideChange(newSlide)
        isDragging.current = false
        startX.current = e.clientX
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !sliderRef.current) return
      
      const sliderWidth = sliderRef.current.offsetWidth
      const slideWidth = sliderWidth / (slides - 1)
      const deltaX = e.touches[0].clientX - currentDragPosition.current
      currentDragPosition.current = e.touches[0].clientX
      
      // Calculate position change based on swipe movement
      const positionChange = deltaX / slideWidth
      
      // Accumulate swipe movement
      const totalDeltaX = e.touches[0].clientX - startX.current
      
      // Move thumb during swiping for visual feedback
      if (thumbRef.current) {
        const currentPosition = (currentSlide / (slides - 1)) * 100
        const newPosition = Math.max(0, Math.min(100, currentPosition + (deltaX / sliderWidth) * 100))
        thumbRef.current.style.left = `${newPosition}%`
      }
      
      // Calculate new slide based on significant swipe distance
      if (Math.abs(totalDeltaX) > slideWidth / 4) {
        const newSlide = totalDeltaX > 0 
          ? Math.max(0, currentSlide - 1)
          : Math.min(slides - 1, currentSlide + 1)
        
        onSlideChange(newSlide)
        isDragging.current = false
        startX.current = e.touches[0].clientX
      }
    }

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        document.body.style.userSelect = ''
        document.body.style.overflow = ''
      }
    }

    const handleTouchEnd = () => {
      if (isDragging.current) {
        isDragging.current = false
        document.body.style.userSelect = ''
        document.body.style.overflow = ''
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.userSelect = ''
      document.body.style.overflow = ''
    }
  }, [currentSlide, slides, onSlideChange])

  return (
    <div className="slider-container">
      <div 
        className="slider-bar" 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {Array.from({ length: slides }).map((_, index) => (
          <div 
            key={index}
            className={`slider-point ${currentSlide === index ? 'active' : ''}`}
            onClick={() => handlePointClick(index)}
            style={{ left: `${(index / (slides - 1)) * 100}%` }}
          />
        ))}
        <div 
          className="slider-thumb" 
          ref={thumbRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ left: `${(currentSlide / (slides - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
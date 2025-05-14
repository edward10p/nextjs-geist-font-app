"use client"

import { useEffect, useState } from "react"
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns"

interface CountdownTimerProps {
  targetDate: string
  onExpire?: () => void
}

export function CountdownTimer({ targetDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate)
      const now = new Date()

      if (target <= now) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        onExpire?.()
        return
      }

      setTimeLeft({
        days: differenceInDays(target, now),
        hours: differenceInHours(target, now) % 24,
        minutes: differenceInMinutes(target, now) % 60,
        seconds: differenceInSeconds(target, now) % 60,
        isExpired: false
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onExpire])

  if (timeLeft.isExpired) {
    return (
      <div className="text-red-500 font-medium">
        Servicio Expirado
      </div>
    )
  }

  const isNearExpiry = timeLeft.days <= 3

  return (
    <div className={`text-sm font-medium ${isNearExpiry ? 'text-yellow-500' : 'text-green-500'}`}>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      {isNearExpiry && (
        <span className="ml-2 text-yellow-500">
          ¡Próximo a expirar!
        </span>
      )}
    </div>
  )
}

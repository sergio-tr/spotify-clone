import { useState, useEffect } from "react"
import { Slider } from '@/components/Slider'

export const SongController = ({ audioRef }) => {
    const [currentTime, setCurrentTime] = useState(0)

    const formatCurrentTime = (seconds) => {

        if (!seconds) {
        return '0:00'
        }

        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

        return `${minutes}:${formattedSeconds}`
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    return (
        <div className="flex gap-x-3">
            <span className="opacity-70">{formatCurrentTime(currentTime)}</span>
            <Slider
                min={0}
                max={audioRef?.current?.duration ?? 0}
                className="w-96"
                value={[currentTime]}
                onValueChange={(value) => {
                    const [newCurrentTime] = value
                    audioRef.current.currentTime = newCurrentTime
                }}
                />
            <span className="opacity-70">{formatCurrentTime(audioRef?.current?.duration ?? 0)}</span>
        </div>
    )
}
import { useState, useRef, useEffect } from "react"
import { usePlayerStore } from '@/stores/playerStore'
import { Slider } from '@/components/Slider'

export const Pause = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

export const Play = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

export const VolumeSilence = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
)

export const VolumeHigh = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
)

const CurrentSong = ({ image, title, artists }) => {

  const listFormat = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
  const allArtistsTogether = listFormat.format(artists)

  return (
    <div className="flex items-center gap-5 relative overflow-hidden px-3 mt-3">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-md overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <p className="font-semibold text-sm block">
          {title}
        </p>
        <span className="text-xs opacity-80">
          {allArtistsTogether}
        </span>
      </div>

    </div>
  )
}

const SongController = ({ audioRef }) => {
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
    <div className="flex justify-center gap-x-3">
      <span className="opacity-70">{formatCurrentTime(currentTime)}</span>
      <Slider
        min={0}
        max={audioRef?.current?.duration ?? 0}
        className="w-64"
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

const VolumeController = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumeRef = useRef(volume)

  const handleClickSilent = () => {
    previousVolumeRef.current = volume
    setVolume(0)
  }

  const handleClickPrevVolume = () => {
    setVolume(previousVolumeRef.current)
  }

  const handleVolumeClick = () => {
    if (volume < 0.1) {
      handleClickPrevVolume()
    } else {
      handleClickSilent()
    }
  }

  const getVolumeIcon = () => {
    if (volume < 0.1) return <VolumeSilence />
    return <VolumeHigh />
  };

  return (<div className="flex flex-row gap-2 text-white">
    <button className="opacity-70 hover:opacity-100 transition" onClick={handleVolumeClick}>
      {getVolumeIcon()}
    </button>
    <Slider
      min={0}
      max={100}
      defaultValue={[100]}
      value={[volume * 100]}
      className="w-24"
      onValueChange={(value) => {
        const [newVolume] = value
        const vol = newVolume / 100

        setVolume(vol)
      }}
    />
  </div>
  )
}

export function Player() {

  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(state => state)

  const audioRef = useRef()

  // listener of selected song playing or not (IN FOOTER PLAYER)
  useEffect(() => {

    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()

  }, [isPlaying])

  // listener to selected song changing (PLAYLIST CHANGED)
  useEffect(() => {

    const { playlist, song, songs } = currentMusic

    if (song) {

      let srcSong = ""

      if (playlist) {
        srcSong = `/music/${playlist?.id}/0${song?.id}.mp3`
      } else {
        srcSong = `/music/${song?.id}.mp3`
      }

      audioRef.current.src = srcSong

      // ** For volume to be maintained if songs restart
      audioRef.current.volume = volume

      audioRef.current.play()
      setIsPlaying(true)

    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }

  }, [currentMusic])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex justify-between w-full z-20">
      <div>
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex flex-col justify-center items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <SongController audioRef={audioRef} />

          <audio ref={audioRef}> </audio>
        </div>
      </div>

      <div class="flex px-8 gap-x-2">
        <VolumeController></VolumeController>
      </div>

    </div>
  )
}
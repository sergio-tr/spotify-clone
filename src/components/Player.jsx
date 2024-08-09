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

export const VolumeLow = () => {
  <svg data-encore-id="icon" role="presentation" aria-label="Volumen bajo" aria-hidden="true" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>
}

export const VolumeMedium = () => {
  <svg data-encore-id="icon" role="presentation" aria-label="Volumen medio" aria-hidden="true" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>
}

export const VolumeHigh = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
)

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div  className="flex items-center gap-5 relative overflow-hidden px-3 mt-3">
        <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-md overflow-hidden">
          <img src={image} alt={title} />
        </picture>

        <div className="flex flex-col">
          <p className="font-semibold text-sm block">
            {title}
          </p>
          <span className="text-xs opacity-80">
            {artists?.join(', ')}
          </span>
        </div>

    </div>
  )
}

const VolumeController = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)

  return (<Slider min={0}
                  max={100}
                  defaultValue={[100]}
                  className="w-24"
                  onValueChange={(value) => {
                    const [newVolume] = value
                    const vol = newVolume / 100

                    // ** For volume to be maintained if songs restartnewVolume
                    volumeRef.current = vol

                    audioRef.current.volume = vol
                  }}
          />
        )
}

export function Player () {

  const { isPlaying, setIsPlaying, currentMusic} = usePlayerStore(state => state)
  
  const audioRef = useRef()
  const volumeRef = useRef(1)

  // listener of selected song playing or not (IN FOOTER PLAYER)
  useEffect( () => {

    isPlaying 
      ? audioRef.current.play()
      : audioRef.current.pause()

  }, [isPlaying] )

  // listener to selected song changing (PLAYLIST CHANGED)
  useEffect( () => {

    const { playlist, song, songs } = currentMusic
  
    if(song) {

      let srcSong = ""
      
      if(playlist){
        srcSong = `/music/${playlist?.id}/0${song?.id}.mp3`
      } else {
        srcSong = `/music/${song?.id}.mp3`
      }

      audioRef.current.src = srcSong

      // ** For volume to be maintained if songs restartnewVolume
      audioRef.current.volume = volumeRef.current

      audioRef.current.play()
      setIsPlaying(true)

    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }

  }, [currentMusic] )

  const handleClick = () => {

    setIsPlaying(!isPlaying)
  }

  return (
    <div className="grid grid-cols-3 w-full z-20 items-center">
        <div>
          <CurrentSong {...currentMusic.song} />
        </div>

        <div className="grid place-content-center gap-4 flex-1">
          <div className="flex justify-center flex-col items-center">
            <button className="bg-white rounded-full p-2" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
        </div>

        <div className="grid place-content-center">
          
        </div>

        <audio ref={audioRef}></audio>

    </div>
  )
}
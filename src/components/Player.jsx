import { useRef, useEffect } from "react"
import { usePlayerStore } from '@/stores/playerStore'

import { CurrentSong } from "@/components/CurrentSong"
import { SongController } from "@/components/SongController"
import { VolumeController } from "@/components/VolumeController"

export const Pause = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

export const Play = ({ className }) => (
  <svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

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
      <div className="w-[200px]">
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex flex-col justify-center items-center pt-2">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <SongController audioRef={audioRef} />

          <audio ref={audioRef}> </audio>
        </div>
      </div>

      <div className="flex px-8 gap-x-2 w-[200px]">
        <VolumeController></VolumeController>
      </div>

    </div>
  )
}
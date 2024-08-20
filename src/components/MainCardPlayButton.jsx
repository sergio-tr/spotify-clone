import { Pause, Play } from '@/components/Player'
import { usePlayerStore } from '@/stores/playerStore'

export function MainCardPlayButton({ id, songNumber = -1, size = 'small', bgColor = 'bg-green-500', bgHoverColor = 'bg-green-400' }){
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    let isThisPlaying = songNumber === -1 
        ? isPlaying && currentMusic?.playlist?.id === id
        : isPlaying && currentMusic?.playlist?.id === id && currentMusic?.song?.id-1 === songNumber

    const handleClick = () => {

        if(isThisPlaying){
            setIsPlaying(false)
            return
        }

        if(currentMusic?.playlist?.id !== id){
            fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data

                setCurrentMusic({ songs, playlist, song: songs[songNumber === -1 ? 0 : songNumber] })
            })
        } else {
            setIsPlaying(true)
        }

    }

    let iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

    if(size === 'extra-small') iconClassName = 'w-3 h-3'

    // FIXME: hover:bg-color does not seem to work
    const buttonClassName = `main-card-play-button rounded-full ${bgColor} p-4 hover:scale-105 transition hover:${bgHoverColor}`

    return <button className={buttonClassName} onClick={handleClick}>
        {isThisPlaying ? <Pause className={ iconClassName }/> : <Play className={ iconClassName } />}
    </button>
}
import { Pause, Play } from '@/components/Player'
import { usePlayerStore } from '@/stores/playerStore'

export function MainCardPlayButton({ id, size = 'small' }){
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    const isThisPlaying = isPlaying && currentMusic?.playlist?.id === id

    const handleClick = () => {

        if(isThisPlaying){
            setCurrentMusic({ })
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data

                setCurrentMusic({ songs, playlist, song: songs[0] })
            })
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

    return <button className="main-card-play-button rounded-full bg-green-500 p-4" onClick={handleClick}>
        {isThisPlaying ? <Pause className={ iconClassName }/> : <Play className={ iconClassName } />}
    </button>
}
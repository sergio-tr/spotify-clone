export const CurrentSong = ({ image, title, artists }) => {

    const listFormat = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
    const allArtistsTogether = listFormat.format(artists)
  
    return (
      <div className="flex items-center gap-5 relative overflow-hidden px-3 mt-3">
        <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-md overflow-hidden">
          <img src={image ?? '/nomusic.jpeg'} alt={title} />
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
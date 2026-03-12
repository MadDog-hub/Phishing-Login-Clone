import { Heart, MessageSquare, Share2, Music } from "lucide-react";

export function VideoFeed() {
  return (
    <div className="max-w-[600px] mx-auto py-8 flex flex-col gap-8 pb-32">
      <VideoPost 
        videoUrl="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
        username="dance_master"
        description="Learning the new trending dance! #fyp #dance #trending"
        song="Original Sound - dance_master"
        likes="1.2M"
        comments="14.5K"
      />
      <VideoPost 
        videoUrl="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=1000&auto=format&fit=crop"
        username="travel_diaries"
        description="Sunset in Bali is unreal 😍 #travel #bali #aesthetic"
        song="Sunset Vibes - Chill Beats"
        likes="890K"
        comments="5.2K"
      />
    </div>
  );
}

function VideoPost({ videoUrl, username, description, song, likes, comments }: any) {
  return (
    <div className="flex gap-4">
      <div className="hidden sm:block mt-2">
        <div className="w-14 h-14 rounded-full bg-muted overflow-hidden cursor-pointer">
           <img src={`https://i.pravatar.cc/150?u=${username}`} alt={username} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="mb-3 pr-12">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg hover:underline cursor-pointer">{username}</h3>
            <span className="text-sm text-foreground/80 hover:underline cursor-pointer">Follow</span>
          </div>
          <p className="text-sm text-foreground/90 mt-1 leading-snug">{description}</p>
          <p className="text-sm font-semibold flex items-center gap-2 mt-2 hover:underline cursor-pointer">
            <Music className="w-4 h-4" />
            {song}
          </p>
        </div>

        <div className="flex items-end gap-4 relative">
          <div className="relative w-full max-w-[340px] aspect-[9/16] bg-muted rounded-xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer">
            {/* landing page fake video poster */}
            <img 
              src={videoUrl} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-muted cursor-pointer transition-colors">
                <Heart className="w-6 h-6 text-white fill-transparent" />
              </div>
              <span className="text-xs font-semibold mt-1 text-white/90">{likes}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-muted cursor-pointer transition-colors">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold mt-1 text-white/90">{comments}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-muted cursor-pointer transition-colors">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold mt-1 text-white/90">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

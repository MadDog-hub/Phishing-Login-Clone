import { Link } from "wouter";
import { Search, Home, Compass, Users, Video, Plus, MoreVertical, MessageSquare, Heart, Share2, Music } from "lucide-react";
import { Button } from "./ui/button";

export function TikTokLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[60px] border-b border-border/40 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-1 w-[200px]">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0V32.9669C24 37.9542 19.9678 42 15.008 42C10.0483 42 6 37.9626 6 32.991C6 27.9735 10.0163 23.95 15 23.95V29.9806C13.3444 29.9806 12.016 31.3323 12.016 32.991C12.016 34.6496 13.3604 35.985 15.008 35.985C16.6556 35.985 17.984 34.6496 17.984 32.991V0H24Z" fill="#25F4EE"/>
                <path d="M24.016 0V32.9669C24.016 37.9542 19.9839 42 15.024 42C10.0643 42 6.01602 37.9626 6.01602 32.991C6.01602 27.9735 10.0323 23.95 15.016 23.95V29.9806C13.3604 29.9806 12.032 31.3323 12.032 32.991C12.032 34.6496 13.3764 35.985 15.024 35.985C16.6716 35.985 18 34.6496 18 32.991V0H24.016Z" fill="#FE2C55" style={{ mixBlendMode: 'screen' }}/>
                <path d="M24 0V11.9679C28.3283 12.285 31.8152 15.6517 32.1868 19.9698H38C37.5855 12.3168 31.5794 6.26257 24 6V0Z" fill="#25F4EE"/>
                <path d="M24.016 0V11.9679C28.3444 12.285 31.8312 15.6517 32.2028 19.9698H38.016C37.6016 12.3168 31.5954 6.26257 24.016 6V0Z" fill="#FE2C55" style={{ mixBlendMode: 'screen' }}/>
                <path d="M24 0H30V32.9669C30 40.548 23.2843 46.7212 15.008 46.7212C6.73176 46.7212 0 40.548 0 32.991C0 25.4339 6.73176 19.2346 15 19.2346V25.2652C10.6865 25.2652 7.1852 28.7297 7.1852 32.991C7.1852 37.2523 10.6865 40.7005 15.008 40.7005C19.3295 40.7005 22.8148 37.2523 22.8148 32.991V11.9679C27.1332 12.285 30.6128 15.6517 30.9834 19.9698H36.996C36.5684 12.3168 30.5658 6.26257 23.0034 6H24V0Z" fill="white"/>
              </svg>
              <span className="font-display font-bold text-xl tracking-tight hidden sm:block">TikTok</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-[500px] mx-4 relative group">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-muted/50 hover:bg-muted/70 focus:bg-muted focus:ring-1 focus:ring-border/50 border border-transparent rounded-full py-2.5 pl-4 pr-12 text-sm outline-none transition-all placeholder:text-muted-foreground"
          />
          <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center border-l border-border/40 text-muted-foreground hover:bg-muted/80 rounded-r-full cursor-pointer">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-4 w-[200px] justify-end">
          <Button variant="ghost" className="hidden sm:flex font-semibold hover:bg-muted text-foreground/90">
            <Plus className="w-5 h-5 mr-1" />
            Upload
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            Log In
          </Button>
          <button className="text-foreground/80 hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[72px] lg:w-[240px] shrink-0 border-r border-border/40 h-full py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <nav className="px-2 space-y-1">
            <NavItem icon={<Home className="w-6 h-6" />} label="For You" active />
            <NavItem icon={<Compass className="w-6 h-6" />} label="Explore" />
            <NavItem icon={<Users className="w-6 h-6" />} label="Following" />
            <NavItem icon={<Video className="w-6 h-6" />} label="LIVE" />
            <NavItem icon={<Search className="w-6 h-6" />} label="Search" className="lg:hidden" />
          </nav>
          
          <div className="hidden lg:block border-t border-border/40 mt-4 pt-4 px-4">
            <p className="text-muted-foreground text-sm font-semibold mb-4">Log in to follow creators, like videos, and view comments.</p>
            <Button variant="outline" className="w-full font-bold h-12 text-primary border-primary hover:bg-primary/5">
              Log in
            </Button>
          </div>
          
          <div className="hidden lg:block border-t border-border/40 mt-4 pt-4 px-4 pb-12">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">Suggested accounts</h4>
            {/* Fake users */}
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-muted/50 p-1 -ml-1 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">user_{Math.floor(Math.random() * 10000)}</p>
                  <p className="text-xs text-muted-foreground truncate">Popular Creator</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Feed / Main Area */}
        <main className="flex-1 h-full overflow-y-auto bg-black relative scroll-smooth no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, className = "" }: { icon: React.ReactNode, label: string, active?: boolean, className?: string }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${active ? 'text-primary' : 'text-foreground/90 hover:bg-muted'} ${className}`}>
      {icon}
      <span className={`text-lg hidden lg:block ${active ? 'font-bold' : 'font-semibold'}`}>{label}</span>
    </div>
  );
}

import { TikTokLayout } from "@/components/layout";
import { VideoFeed } from "@/components/video-feed";
import { PhishModal } from "@/components/phish-modal";

export default function Home() {
  return (
    <TikTokLayout>
      <VideoFeed />
      <PhishModal />
    </TikTokLayout>
  );
}

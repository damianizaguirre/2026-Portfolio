import HomeBottomCue from "@/components/HomeBottomCue";

export default function Home() {
  return (
    <>
      <iframe
        id="home-frame"
        title="Damian Izaguirre portfolio prototype"
        src="/figma-home-frame-prototype.html"
        className="fixed inset-0 h-dvh w-screen border-0 bg-white"
      />
      <HomeBottomCue frameId="home-frame" />
    </>
  );
}

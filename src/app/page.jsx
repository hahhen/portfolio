
import Header from "@/components/header/header";
import Desktop from "@/components/desktop/desktop";
import BackgroundVideo from "@/components/desktop/backgroundvideo";

export default function Home() {
  return (
    <main className="flex w-full p-3 lg:p-0 h-[100dvh] justify-center relative items-center overflow-hidden">
      <BackgroundVideo />
      <div className="screen flex flex-col max-w-[800px] overflow-hidden rounded-xl w-full h-[600px] bg-main bg-repeat max-h-[100dvh]">
        <Header />
        <Desktop />
      </div>
    </main>
  );
}

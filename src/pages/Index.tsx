import HeroSection from "@/components/HeroSection";
import ComposerForm from "@/components/ComposerForm";
import CompositionSelector from "@/components/CompositionSelector";
import VoiceUpload from "@/components/VoiceUpload";
import InstrumentSelector from "@/components/InstrumentSelector";
import FinalComposition from "@/components/FinalComposition";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <HeroSection />
      <ComposerForm />
      <CompositionSelector />
      <VoiceUpload />
      <InstrumentSelector />
      <FinalComposition />
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { Music, Sparkles, Mic, Download } from "lucide-react";

const HeroSection = () => {
  const scrollToComposer = () => {
    document.getElementById('composer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20"></div>
      
      {/* Floating musical notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Music className="w-8 h-8 text-primary/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float" style={{animationDelay: '2s'}}>
          <Sparkles className="w-6 h-6 text-accent/40" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{animationDelay: '4s'}}>
          <Mic className="w-7 h-7 text-primary/25" />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
          Verse to Tune Craft
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Transform your lyrics into magical musical compositions with AI-powered melody generation, 
          custom instrumentation, and personalized vocal integration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToComposer}
            className="text-lg px-8 py-4 h-14"
          >
            <Music className="w-5 h-5" />
            Start Composing
          </Button>
          <Button variant="studio" size="lg" className="text-lg px-8 py-4 h-14">
            <Download className="w-5 h-5" />
            Listen to Demos
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Composition</h3>
            <p className="text-muted-foreground">Advanced algorithms analyze your lyrics to create perfect musical arrangements</p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Mic className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Voice Integration</h3>
            <p className="text-muted-foreground">Upload your voice samples and let AI map them to your composition</p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-glow/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Download className="w-6 h-6 text-primary-glow" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Studio Quality</h3>
            <p className="text-muted-foreground">Download high-quality compositions ready for performance or recording</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
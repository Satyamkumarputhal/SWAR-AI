import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Pause, Share2, AudioWaveform, Clock, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FinalComposition = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const generateComposition = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGenerated(true);
          toast({
            title: "Composition Complete!",
            description: "Your musical masterpiece is ready for download.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 30000); // 30 second preview
    }
  };

  const downloadComposition = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Started",
        description: "Your composition is being downloaded as a high-quality MP3 file.",
      });
    }, 2000);
  };

  const shareComposition = () => {
    toast({
      title: "Share Link Copied",
      description: "A shareable link to your composition has been copied to clipboard.",
    });
  };

  return (
    <div id="final-composition" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Musical Masterpiece</h2>
          <p className="text-lg text-muted-foreground">
            Generate and download your complete musical composition
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              Final Composition
            </CardTitle>
            <CardDescription>
              Your lyrics transformed into a complete musical arrangement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isGenerated && !isGenerating && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <AudioWaveform className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-muted-foreground mb-6">
                    Click below to create your final composition with all selected instruments and your voice.
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={generateComposition}
                    className="text-lg px-8 py-4"
                  >
                    <Music className="w-5 h-5" />
                    Generate Composition
                  </Button>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <AudioWaveform className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Generating Your Composition</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI is crafting your musical masterpiece...
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing audio layers...</span>
                    <span>{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${generationProgress > 20 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={generationProgress > 20 ? 'text-foreground' : 'text-muted-foreground'}>
                      Analyzing lyrics
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${generationProgress > 40 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={generationProgress > 40 ? 'text-foreground' : 'text-muted-foreground'}>
                      Mapping melodies
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${generationProgress > 60 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={generationProgress > 60 ? 'text-foreground' : 'text-muted-foreground'}>
                      Mixing instruments
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${generationProgress > 80 ? 'bg-primary' : 'bg-muted'}`} />
                    <span className={generationProgress > 80 ? 'text-foreground' : 'text-muted-foreground'}>
                      Adding vocals
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isGenerated && (
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">My Musical Composition</h3>
                      <p className="text-muted-foreground">Generated just now</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        3:42
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        Studio Quality
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button 
                      variant="musical" 
                      onClick={togglePlayback}
                      className="flex-1"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause Preview
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play Preview
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={downloadComposition}
                    disabled={isDownloading}
                    className="text-lg py-4"
                  >
                    {isDownloading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Downloading...
                      </div>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download MP3
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="studio" 
                    size="lg" 
                    onClick={shareComposition}
                    className="text-lg py-4"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Composition
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>High-quality 320kbps MP3 • Stereo • 44.1kHz</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isGenerated && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
              <Music className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">
                Composition complete! Create more musical masterpieces.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalComposition;
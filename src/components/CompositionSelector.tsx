import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Check, Music2, Volume2 } from "lucide-react";

interface Composition {
  id: string;
  title: string;
  style: string;
  tempo: string;
  key: string;
  description: string;
  toneMapping: string[];
}

const CompositionSelector = () => {
  const [selectedComposition, setSelectedComposition] = useState<string>("");
  const [playingComposition, setPlayingComposition] = useState<string>("");

  const compositions: Composition[] = [
    {
      id: "comp1",
      title: "Melodic Journey",
      style: "Contemporary Pop",
      tempo: "120 BPM",
      key: "C Major",
      description: "A flowing melody with gentle progressions that perfectly complements your lyrical narrative.",
      toneMapping: ["C4", "E4", "G4", "A4", "F4", "G4", "E4", "C4"]
    },
    {
      id: "comp2",
      title: "Rhythmic Pulse",
      style: "Modern Folk",
      tempo: "95 BPM",
      key: "G Major",
      description: "An intimate composition with organic rhythms and warm harmonies for storytelling.",
      toneMapping: ["G4", "B4", "D5", "C5", "B4", "A4", "G4", "D4"]
    }
  ];

  const togglePlayback = (compositionId: string) => {
    if (playingComposition === compositionId) {
      setPlayingComposition("");
    } else {
      setPlayingComposition(compositionId);
      // Simulate stopping after 3 seconds
      setTimeout(() => setPlayingComposition(""), 3000);
    }
  };

  const selectComposition = (compositionId: string) => {
    setSelectedComposition(compositionId);
    document.getElementById('voice-upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="compositions" className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Generated Compositions</h2>
          <p className="text-lg text-muted-foreground">
            Choose your preferred musical arrangement and tone mapping
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {compositions.map((composition) => (
            <Card 
              key={composition.id} 
              className={`bg-card/80 backdrop-blur-sm border transition-all duration-300 hover:bg-card/90 ${
                selectedComposition === composition.id 
                  ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                  : 'border-border'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Music2 className="w-5 h-5 text-primary" />
                      {composition.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {composition.description}
                    </CardDescription>
                  </div>
                  {selectedComposition === composition.id && (
                    <Badge variant="default" className="bg-primary">
                      <Check className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Style</p>
                    <p className="font-medium">{composition.style}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Tempo</p>
                    <p className="font-medium">{composition.tempo}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Key</p>
                    <p className="font-medium">{composition.key}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Tone Mapping Preview</h4>
                  <div className="flex flex-wrap gap-2">
                    {composition.toneMapping.map((tone, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-muted/50 hover:bg-accent transition-colors"
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="studio" 
                    onClick={() => togglePlayback(composition.id)}
                    className="flex-1"
                  >
                    {playingComposition === composition.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Preview
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant={selectedComposition === composition.id ? "default" : "musical"}
                    onClick={() => selectComposition(composition.id)}
                    className="flex-1"
                  >
                    {selectedComposition === composition.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Selected
                      </>
                    ) : (
                      "Select This"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedComposition && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
              <Volume2 className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">
                Composition selected! Continue to voice upload below.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompositionSelector;
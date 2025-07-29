import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Guitar, Piano, Drum, Music, Volume2, Download } from "lucide-react";

interface Instrument {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  sample?: string;
}

const InstrumentSelector = () => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [playingInstrument, setPlayingInstrument] = useState<string>("");

  const instruments: Instrument[] = [
    {
      id: "acoustic-guitar",
      name: "Acoustic Guitar",
      category: "Strings",
      icon: <Guitar className="w-5 h-5" />,
      description: "Warm, organic strumming and fingerpicking"
    },
    {
      id: "electric-guitar",
      name: "Electric Guitar",
      category: "Strings",
      icon: <Guitar className="w-5 h-5" />,
      description: "Versatile electric tones and effects"
    },
    {
      id: "piano",
      name: "Grand Piano",
      category: "Keys",
      icon: <Piano className="w-5 h-5" />,
      description: "Rich, expressive piano melodies"
    },
    {
      id: "electric-piano",
      name: "Electric Piano",
      category: "Keys",
      icon: <Piano className="w-5 h-5" />,
      description: "Modern electric piano sounds"
    },
    {
      id: "drums",
      name: "Drum Kit",
      category: "Percussion",
      icon: <Drum className="w-5 h-5" />,
      description: "Complete acoustic drum set"
    },
    {
      id: "bass",
      name: "Bass Guitar",
      category: "Bass",
      icon: <Music className="w-5 h-5" />,
      description: "Deep, rhythmic bass foundation"
    },
    {
      id: "violin",
      name: "Violin",
      category: "Strings",
      icon: <Music className="w-5 h-5" />,
      description: "Emotional string melodies"
    },
    {
      id: "flute",
      name: "Flute",
      category: "Winds",
      icon: <Music className="w-5 h-5" />,
      description: "Ethereal wind instrument"
    },
    {
      id: "synthesizer",
      name: "Synthesizer",
      category: "Electronic",
      icon: <Music className="w-5 h-5" />,
      description: "Modern electronic textures"
    }
  ];

  const categories = [...new Set(instruments.map(i => i.category))];

  const toggleInstrument = (instrumentId: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrumentId)
        ? prev.filter(id => id !== instrumentId)
        : [...prev, instrumentId]
    );
  };

  const playInstrument = (instrumentId: string) => {
    setPlayingInstrument(instrumentId);
    setTimeout(() => setPlayingInstrument(""), 2000);
  };

  const generateFinalComposition = () => {
    window.location.href = '/finalize-composition';
  };

  return (
    <div id="instruments" className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Instruments</h2>
          <p className="text-lg text-muted-foreground">
            Select instruments to bring your composition to life
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="px-4 py-2">
              {selectedInstruments.length} instruments selected
            </Badge>
          </div>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-primary">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instruments
                .filter(instrument => instrument.category === category)
                .map(instrument => (
                  <Card 
                    key={instrument.id}
                    className={`bg-card/80 backdrop-blur-sm border transition-all duration-300 hover:bg-card/90 cursor-pointer ${
                      selectedInstruments.includes(instrument.id)
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedInstruments.includes(instrument.id)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {instrument.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{instrument.name}</CardTitle>
                          </div>
                        </div>
                        <Checkbox
                          checked={selectedInstruments.includes(instrument.id)}
                          onCheckedChange={() => toggleInstrument(instrument.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4">
                        {instrument.description}
                      </CardDescription>
                      <div className="flex gap-2">
                        <Button
                          variant="studio"
                          size="sm"
                          onClick={() => playInstrument(instrument.id)}
                          className="flex-1"
                        >
                          {playingInstrument === instrument.id ? (
                            <>
                              <Volume2 className="w-3 h-3" />
                              Playing...
                            </>
                          ) : (
                            "Preview"
                          )}
                        </Button>
                        <Button
                          variant={selectedInstruments.includes(instrument.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleInstrument(instrument.id)}
                          className="flex-1"
                        >
                          {selectedInstruments.includes(instrument.id) ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {selectedInstruments.length > 0 && (
          <div className="mt-16 text-center">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Selected Instruments</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {selectedInstruments.map(id => {
                  const instrument = instruments.find(i => i.id === id);
                  return (
                    <Badge key={id} variant="default" className="px-4 py-2">
                      {instrument?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            <Button 
              variant="hero" 
              size="lg" 
              onClick={generateFinalComposition}
              className="text-lg px-8 py-4"
            >
              <Download className="w-5 h-5" />
              Generate Final Composition
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentSelector;
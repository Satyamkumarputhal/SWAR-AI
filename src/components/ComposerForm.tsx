import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ComposerForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    lyrics: "",
    theme: "",
    raaga: "",
    scale: "",
  });
  const [tokensRemaining, setTokensRemaining] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const themes = [
    "Bhajan", "Romantic Song", "Jazz", "Indie", "Pop", "Dance", 
    "Classical", "Folk", "Blues", "Rock", "Ambient", "Electronic"
  ];

  const raagas = [
    "Yaman", "Bhairav", "Malkauns", "Darbari", "Kafi", "Bilawal",
    "Marwa", "Purvi", "Todi", "Bageshri", "Khamaaj", "Asavari"
  ];

  const scales = [
    "C Major", "G Major", "D Major", "A Major", "E Major", "B Major",
    "F# Major", "C# Major", "F Major", "Bb Major", "Eb Major", "Ab Major",
    "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor", "G# Minor",
    "D# Minor", "Bb Minor", "F Minor", "C Minor", "G Minor", "D Minor"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.lyrics.trim()) {
      toast({
        title: "Lyrics Required",
        description: "Please enter your song lyrics to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.theme) {
      toast({
        title: "Theme Required",
        description: "Please select a musical theme for your composition.",
        variant: "destructive",
      });
      return;
    }

    if (tokensRemaining <= 0) {
      toast({
        title: "No Tokens Remaining",
        description: "Please purchase more tokens to continue composing.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate composition generation
    setTimeout(() => {
      setIsGenerating(false);
      setTokensRemaining(prev => prev - 1);
      toast({
        title: "Composition Generated!",
        description: "Your musical composition has been created. Scroll down to view the results.",
      });
      
      // Scroll to compositions section
      document.getElementById('compositions')?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  return (
    <div id="composer" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Compose Your Masterpiece
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Enter your lyrics and musical preferences to generate unique compositions
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              {tokensRemaining} compositions remaining
            </Badge>
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              Musical Parameters
            </CardTitle>
            <CardDescription>
              Define your musical vision and let our AI bring it to life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lyrics">Song Lyrics *</Label>
                <Textarea
                  id="lyrics"
                  placeholder="Enter your song lyrics here... 
                  
For example:
Walking down this empty street tonight
Stars above me shining bright
Every step I take feels right
In this moment, pure delight"
                  value={formData.lyrics}
                  onChange={(e) => setFormData(prev => ({ ...prev, lyrics: e.target.value }))}
                  className="min-h-32 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Musical Theme *</Label>
                  <Select value={formData.theme} onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a musical theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme.toLowerCase()}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale">Musical Scale *</Label>
                  <Select value={formData.scale} onValueChange={(value) => setFormData(prev => ({ ...prev, scale: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a musical scale" />
                    </SelectTrigger>
                    <SelectContent>
                      {scales.map((scale) => (
                        <SelectItem key={scale} value={scale.toLowerCase()}>
                          {scale}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="raaga">Raaga (Optional)</Label>
                <Select value={formData.raaga} onValueChange={(value) => setFormData(prev => ({ ...prev, raaga: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a raaga (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {raagas.map((raaga) => (
                      <SelectItem key={raaga} value={raaga.toLowerCase()}>
                        {raaga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full text-lg py-6"
                disabled={isGenerating || tokensRemaining <= 0}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Generating Composition...
                  </div>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Musical Composition
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComposerForm;
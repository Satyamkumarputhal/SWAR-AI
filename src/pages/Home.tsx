import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Hero Section */}
      <div className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Verse to Tune Craft
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your lyrics into magical musical compositions with AI-powered
            melody generation, custom instrumentation, and personalized vocal integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link to="/compose">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <Music className="w-5 h-5 mr-2" />
                Start Composing
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              Listen to Demos
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border hover:bg-card/90 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced algorithms analyze your lyrics to create perfect musical arrangements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:bg-card/90 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Voice Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload your voice samples and let AI map them to your composition
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:bg-card/90 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Download className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Studio Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Download high-quality compositions ready for performance or recording
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Mic, Play, Pause, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceUpload = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setUploadedFile(file);
        simulateUpload();
        toast({
          title: "Voice Sample Uploaded",
          description: "Your voice has been successfully uploaded and analyzed.",
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an audio file (MP3, WAV, etc.).",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(interval);
          setIsRecording(false);
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Saved",
      description: "Your voice recording has been captured and processed.",
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const continueToInstruments = () => {
    window.location.href = '/instrument-selection';
  };

  return (
    <div id="voice-upload" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Add Your Voice</h2>
          <p className="text-lg text-muted-foreground">
            Upload a voice sample or record directly to personalize your composition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Voice Sample
              </CardTitle>
              <CardDescription>
                Upload an existing audio file with your voice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your audio file here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    variant="studio" 
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mic className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeFile}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                  
                  {uploadProgress === 100 && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Check className="w-4 h-4" />
                      Voice sample processed successfully
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recording Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-accent" />
                Record Voice
              </CardTitle>
              <CardDescription>
                Record your voice directly in the browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className={`w-24 h-24 rounded-full border-4 mx-auto flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'border-red-500 bg-red-500/10 animate-pulse' 
                    : 'border-accent bg-accent/10'
                }`}>
                  <Mic className={`w-8 h-8 ${isRecording ? 'text-red-500' : 'text-accent'}`} />
                </div>
                
                {isRecording && (
                  <div className="text-center">
                    <p className="text-lg font-medium text-red-500">Recording...</p>
                    <p className="text-sm text-muted-foreground">
                      {recordingTime}s / 30s
                    </p>
                    <Progress value={(recordingTime / 30) * 100} className="mt-2" />
                  </div>
                )}

                <div className="space-y-3">
                  {!isRecording ? (
                    <Button 
                      variant="musical" 
                      size="lg" 
                      onClick={startRecording}
                      className="w-full"
                    >
                      <Mic className="w-4 h-4" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive" 
                      size="lg" 
                      onClick={stopRecording}
                      className="w-full"
                    >
                      Stop Recording
                    </Button>
                  )}

                  {recordingTime > 0 && !isRecording && (
                    <Button 
                      variant="studio" 
                      onClick={togglePlayback}
                      className="w-full"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Playing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play Recording
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {(uploadedFile || recordingTime > 0) && (
          <div className="mt-12 text-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={continueToInstruments}
              className="text-lg px-8 py-4"
            >
              Continue to Instruments
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceUpload;
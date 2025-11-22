import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Play, Pause, Send, Eye, AlertTriangle, CheckCircle, Cpu, Zap, Wifi, Scan } from "lucide-react";

export default function ScrapAI() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any[]>([]);
  const [purityScore, setPurityScore] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState("webcam");
  const [scanMode, setScanMode] = useState("auto");
  const [iotData, setIotData] = useState({
    temperature: 25.3,
    humidity: 65,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 }
  });
  const [mlModelStatus, setMlModelStatus] = useState("loaded");
  const [processingTime, setProcessingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Load OpenCV.js simulation
    const loadOpenCV = () => {
      setTimeout(() => {
        setMlModelStatus("ready");
        console.log("OpenCV.js and ML models loaded successfully");
      }, 1000);
    };
    loadOpenCV();
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: selectedCamera === "webcam" ? "user" : "environment"
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      // Fallback to mock camera
      setSelectedCamera("mock");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    await startCamera();

    // Simulate OpenCV ML processing
    const processFrame = () => {
      if (!isScanning) return;

      const startTime = performance.now();

      // Simulate OpenCV image processing pipeline
      setTimeout(() => {
        // Mock ML model inference
        const mockResults = [
          { type: "steel", confidence: 94, bbox: [150, 120, 280, 200], material: "Carbon Steel A36", grade: "A" },
          { type: "rust", confidence: 87, bbox: [180, 140, 50, 40], severity: "moderate" },
          { type: "paint", confidence: 76, bbox: [300, 180, 80, 30], color: "blue" },
          { type: "oil", confidence: 82, bbox: [250, 300, 60, 25], contamination: "light" }
        ];

        // Simulate IoT data integration
        setIotData({
          temperature: 24.8 + Math.random() * 2,
          humidity: 62 + Math.random() * 6,
          weight: 45.2 + Math.random() * 5,
          dimensions: {
            length: 120 + Math.random() * 10,
            width: 80 + Math.random() * 5,
            height: 25 + Math.random() * 3
          }
        });

        setDetectionResults(mockResults);
        setPurityScore(78 + Math.random() * 15);

        const endTime = performance.now();
        setProcessingTime(endTime - startTime);

        if (scanMode === "auto") {
          setTimeout(processFrame, 100); // Continuous scanning
        }
      }, 150); // Simulate processing delay
    };

    processFrame();
  };

  const stopScanning = () => {
    setIsScanning(false);
    setDetectionResults([]);
    setPurityScore(0);
    stopCamera();
  };

  const captureAndAnalyze = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        // Simulate advanced OpenCV analysis
        console.log("Captured frame for detailed analysis");
        // Here would be actual OpenCV.js processing
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Advanced Scrap AI Detector</h1>
          <p className="text-muted-foreground">OpenCV ML-powered material detection with IoT integration</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={mlModelStatus === "ready" ? "text-green-600" : "text-yellow-600"}>
            <Cpu className="w-4 h-4 mr-1" />
            ML Model: {mlModelStatus}
          </Badge>
          <Badge variant="outline" className="text-blue-600">
            <Wifi className="w-4 h-4 mr-1" />
            IoT Connected
          </Badge>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium">Camera</div>
                <div className="text-xs text-muted-foreground">
                  {selectedCamera === "mock" ? "Mock Mode" : "HD 720p"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm font-medium">Processing</div>
                <div className="text-xs text-muted-foreground">
                  {processingTime.toFixed(1)}ms/frame
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-sm font-medium">IoT Sensors</div>
                <div className="text-xs text-muted-foreground">4 Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium">Scan Mode</div>
                <div className="text-xs text-muted-foreground capitalize">{scanMode}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Live Camera Feed
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webcam">Webcam</SelectItem>
                      <SelectItem value="mobile">Mobile Cam</SelectItem>
                      <SelectItem value="industrial">Industrial Cam</SelectItem>
                      <SelectItem value="mock">Mock Camera</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={scanMode} onValueChange={setScanMode}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="continuous">Continuous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: 'none' }}
                />
                {detectionResults.map((detection, index) => (
                  <div
                    key={index}
                    className={`absolute border-2 rounded ${
                      detection.type === "steel" ? "border-green-500" :
                      detection.type === "rust" ? "border-red-500" :
                      detection.type === "paint" ? "border-blue-500" :
                      "border-orange-500"
                    }`}
                    style={{
                      left: `${detection.bbox[0]}px`,
                      top: `${detection.bbox[1]}px`,
                      width: `${detection.bbox[2]}px`,
                      height: `${detection.bbox[3]}px`,
                    }}
                  >
                    <div className={`absolute -top-6 left-0 text-white text-xs px-2 py-0.5 rounded ${
                      detection.type === "steel" ? "bg-green-500" :
                      detection.type === "rust" ? "bg-red-500" :
                      detection.type === "paint" ? "bg-blue-500" :
                      "bg-orange-500"
                    }`}>
                      {detection.material || detection.type} ({detection.confidence}%)
                      {detection.grade && ` - Grade ${detection.grade}`}
                    </div>
                  </div>
                ))}
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center text-white">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Camera Offline</p>
                      <p className="text-sm opacity-75">Select camera and click scan to start detection</p>
                    </div>
                  </div>
                )}
                {isScanning && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    OpenCV Processing: {processingTime.toFixed(1)}ms
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {!isScanning ? (
                  <Button onClick={startScanning} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start AI Scanning
                  </Button>
                ) : (
                  <Button onClick={stopScanning} variant="destructive" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Scanning
                  </Button>
                )}
                <Button onClick={captureAndAnalyze} variant="outline" disabled={!isScanning}>
                  <Scan className="w-4 h-4 mr-2" />
                  Capture
                </Button>
                <Button variant="outline" disabled={!detectionResults.length}>
                  <Send className="w-4 h-4 mr-2" />
                  Send to Furnace
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          {/* Purity Score */}
          <Card>
            <CardHeader>
              <CardTitle>Material Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {purityScore.toFixed(1)}%
                </div>
                <Progress value={purityScore} className="mb-2" />
                <div className="flex justify-center gap-2 text-sm">
                  <Badge variant={purityScore > 85 ? "default" : purityScore > 70 ? "secondary" : "destructive"}>
                    {purityScore > 85 ? "Prime Quality" : purityScore > 70 ? "Good Quality" : "Needs Processing"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IoT Sensor Data */}
          <Card>
            <CardHeader>
              <CardTitle>IoT Sensor Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Temperature</span>
                <span className="font-mono">{iotData.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Humidity</span>
                <span className="font-mono">{iotData.humidity.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weight</span>
                <span className="font-mono">{iotData.weight.toFixed(1)} kg</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Dimensions: {iotData.dimensions.length.toFixed(0)} × {iotData.dimensions.width.toFixed(0)} × {iotData.dimensions.height.toFixed(0)} cm
              </div>
            </CardContent>
          </Card>

          {/* AI Detection Results */}
          <Card>
            <CardHeader>
              <CardTitle>OpenCV ML Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.length > 0 ? (
                detectionResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {result.type === "steel" ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                         <AlertTriangle className="w-4 h-4 text-red-600" />}
                        <span className="text-sm capitalize font-medium">{result.type}</span>
                      </div>
                      <span className="text-sm font-mono">{result.confidence}%</span>
                    </div>
                    {result.material && (
                      <div className="text-xs text-muted-foreground ml-6">
                        Material: {result.material}
                        {result.grade && ` (Grade ${result.grade})`}
                      </div>
                    )}
                    <Progress value={result.confidence} className="h-1" />
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No analysis in progress</p>
                  <p className="text-xs">Start scanning to begin ML detection</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                View Analysis History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Cpu className="w-4 h-4 mr-2" />
                Retrain Model
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Composition Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {detectionResults.filter(r => r.material).map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div>
                    <div className="font-medium">{result.material}</div>
                    <div className="text-sm text-muted-foreground">Grade {result.grade}</div>
                  </div>
                  <Badge variant="outline">{result.confidence}% match</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Frame Rate</span>
                <span className="font-mono">30 FPS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Processing Latency</span>
                <span className="font-mono">{processingTime.toFixed(1)} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Model Accuracy</span>
                <span className="font-mono">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">IoT Data Points</span>
                <span className="font-mono">12 active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as THREE from "three";
import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import type { Hotspot } from "@shared/schema";

export default function DigitalTwin() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  
  const { data: hotspots = [], isLoading } = useQuery<Hotspot[]>({
    queryKey: ['/api/hotspots'],
    refetchInterval: 5000, // Refetch every 5 seconds for updated sensor values
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 15);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Add grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x00ff41, 0x1a1a1a);
    scene.add(gridHelper);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Create main structure (simplified steel plant)
    const mainStructure = new THREE.Group();

    // Central blast furnace (tall cylinder)
    const furnaceGeometry = new THREE.CylinderGeometry(0.5, 0.7, 3, 8);
    const furnaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a9eff,
      emissive: 0x4a9eff,
      emissiveIntensity: 0.2,
      roughness: 0.5,
      metalness: 0.8,
    });
    const furnace = new THREE.Mesh(furnaceGeometry, furnaceMaterial);
    furnace.position.y = 1.5;
    mainStructure.add(furnace);

    // Side structures (boxes)
    const boxGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
      metalness: 0.5,
    });

    const box1 = new THREE.Mesh(boxGeometry, boxMaterial);
    box1.position.set(-2, 0.75, 0);
    mainStructure.add(box1);

    const box2 = new THREE.Mesh(boxGeometry, boxMaterial);
    box2.position.set(2, 0.75, 0);
    mainStructure.add(box2);

    // Connecting pipes
    const pipeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.4,
      metalness: 0.9,
    });

    const pipe1 = new THREE.Mesh(pipeGeometry, pipeMaterial);
    pipe1.position.set(-1, 1.5, 0);
    pipe1.rotation.z = Math.PI / 2;
    mainStructure.add(pipe1);

    const pipe2 = new THREE.Mesh(pipeGeometry, pipeMaterial);
    pipe2.position.set(1, 1.5, 0);
    pipe2.rotation.z = Math.PI / 2;
    mainStructure.add(pipe2);

    // Add hotspot markers
    hotspots.forEach((hotspot) => {
      const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const markerColor =
        hotspot.status === "critical" ? 0xff0000 :
        hotspot.status === "warning" ? 0xffff00 :
        0x00ff41;

      const markerMaterial = new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        opacity: 0.8,
      });

      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(hotspot.position.x, hotspot.position.y, hotspot.position.z);
      marker.userData = { hotspot };
      mainStructure.add(marker);

      // Add glowing ring
      const ringGeometry = new THREE.TorusGeometry(0.2, 0.02, 8, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(marker.position);
      ring.rotation.x = Math.PI / 2;
      mainStructure.add(ring);
    });

    scene.add(mainStructure);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      mainStructure.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      canvasRef.current?.removeChild(renderer.domElement);
    };
  }, [hotspots]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive";
      case "warning": return "bg-yellow-500";
      default: return "bg-accent";
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 grid-bg">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Digital Twin</h1>
            <p className="text-muted-foreground">3D visualization of steel plant infrastructure</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" data-testid="button-zoom-in">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid="button-zoom-out">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid="button-reset">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid="button-fullscreen">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading && (
          <Card className="glass-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              Loading digital twin data...
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="glass-card overflow-hidden">
              <div
                ref={canvasRef}
                className="w-full h-[600px] bg-background"
                data-testid="canvas-3d-twin"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-card-foreground text-base">Hotspots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className="w-full text-left p-3 rounded-md glass hover-elevate active-elevate-2 transition-all"
                    data-testid={`button-hotspot-${hotspot.id.toLowerCase()}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-medium text-card-foreground">{hotspot.name}</span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(hotspot.status)} pulse-glow`} />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {hotspot.id} • {hotspot.sensors.length} sensors
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {selectedHotspot && (
              <Card className="glass-card glow-primary">
                <CardHeader>
                  <CardTitle className="text-card-foreground text-base">
                    {selectedHotspot.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedHotspot.sensors.map((sensor, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{sensor.name}</span>
                      <div className="text-right">
                        <span className="text-sm font-mono text-card-foreground font-medium">
                          {sensor.value}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">{sensor.unit}</span>
                      </div>
                    </div>
                  ))}
                  <Badge className={`${getStatusColor(selectedHotspot.status)} text-background w-full justify-center`}>
                    {selectedHotspot.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

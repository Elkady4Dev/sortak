import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, RotateCcw, Check, AlertCircle, Lightbulb, Focus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner, LoadingOverlay } from "@/components/LoadingSpinner";

interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  onBack: () => void;
  isDemoMode?: boolean;
}

interface ValidationState {
  faceDetected: boolean;
  centered: boolean;
  lighting: boolean;
}

export const PhotoCapture = ({ onPhotoCapture, onBack, isDemoMode = false }: PhotoCaptureProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    faceDetected: false,
    centered: false,
    lighting: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsCameraLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      // Simulate validation after camera starts
      setTimeout(() => {
        setValidation({
          faceDetected: true,
          centered: true,
          lighting: true,
        });
        setIsCameraLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (!isDemoMode && !capturedImage) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isDemoMode, capturedImage, startCamera, stopCamera]);

  useEffect(() => {
    // In demo mode, set validation immediately
    if (isDemoMode) {
      setValidation({
        faceDetected: true,
        centered: true,
        lighting: true,
      });
      setIsCameraLoading(false);
    }
  }, [isDemoMode]);

  useEffect(() => {
    // In demo mode, set the demo image
    if (isDemoMode && !capturedImage) {
      setCapturedImage('https://picsum.photos/400/600?random=portrait');
    }
  }, [isDemoMode, capturedImage]);

  const capturePhoto = () => {
    if (isDemoMode) {
      setIsCapturing(true);
      setTimeout(() => {
        setIsCapturing(false);
        onPhotoCapture(capturedImage!);
      }, 500);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      setCapturedImage(imageData);
      stopCamera();
    }
    setTimeout(() => setIsCapturing(false), 500);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    if (!isDemoMode) {
      startCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCapturedImage(result);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoCapture(capturedImage);
    }
  };

  const allValid = validation.faceDetected && validation.centered && validation.lighting;

  const validationItems = [
    { key: "faceDetected", label: "Face detected", icon: Focus, valid: validation.faceDetected },
    { key: "centered", label: "Face centered", icon: Focus, valid: validation.centered },
    { key: "lighting", label: "Good lighting", icon: Lightbulb, valid: validation.lighting },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Camera/Preview Area */}
      <div className="relative bg-card rounded-3xl overflow-hidden shadow-card-lg mb-8">
        <div className="aspect-[3/4] relative">
          {!capturedImage ? (
            <>
              {isCameraLoading && (
                <div className="absolute inset-0 bg-card/95 flex items-center justify-center z-10">
                  <LoadingSpinner size="md" text="Initializing Camera..." />
                </div>
              )}
              {!isDemoMode && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
              {/* Face guide overlay */}
              {!isCameraLoading && !isDemoMode && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-48 h-60 border-4 rounded-full transition-colors duration-300 ${
                    allValid ? "border-blue-muted" : "border-accent"
                  }`}>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-card-foreground bg-card/90 px-3 py-1 rounded-full">
                      Position your face here
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <img
              src={capturedImage}
              alt="Captured photo"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Demo Mode Indicator */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-4 shadow-lg mb-8 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold">Demo Mode Active</h4>
              <p className="text-sm opacity-90">Using sample data for testing</p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Status */}
      {!capturedImage && (
        <div className="bg-card rounded-2xl p-6 shadow-card mb-8 animate-fade-in">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-secondary" />
            Photo Requirements
          </h3>
          <div className="space-y-3">
            {validationItems.map((item) => (
              <div
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  item.valid ? "bg-blue-soft/20" : "bg-accent/10"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    item.valid ? "bg-blue-muted text-secondary-foreground" : "bg-accent/20 text-accent"
                  }`}
                >
                  {item.valid ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <item.icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`font-medium ${item.valid ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {!capturedImage ? (
          <>
            <div className="flex gap-4">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={capturePhoto}
                disabled={isCapturing || !allValid}
              >
                {isCapturing ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </>
                )}
              </Button>
            </div>
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={triggerFileUpload}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Photo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={retakePhoto}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={confirmPhoto}
            >
              <Check className="w-5 h-5 mr-2" />
              Use This Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

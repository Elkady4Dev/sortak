import { useState, useEffect, useRef, useCallback } from "react";
import { Check, Loader2, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { StepHeader } from "@/components/StepHeader";
import { useToast } from "@/hooks/use-toast";
import { usePhotoJob, type PhotoResult } from "@/hooks/use-photo-job";
import type { DocumentType } from "@/pages/Index";

const getTesterToken = (): string | null => {
  try {
    const raw = localStorage.getItem('tester_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { token?: string; expiresAt?: number };
    if (!parsed?.token || !parsed?.expiresAt) return null;
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem('tester_auth');
      return null;
    }
    return parsed.token;
  } catch {
    return null;
  }
};

// --- Sub-components ---

function VariationSkeleton({ variationId }: { variationId: number }) {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card bg-muted">
      <Skeleton className="w-full h-full rounded-2xl" />
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-sm font-semibold text-foreground">
        {variationId}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
      </div>
    </div>
  );
}

function VariationCard({
  result,
  isSelected,
  onSelect,
}: {
  result: PhotoResult;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection
    const link = document.createElement('a');
    link.href = result.imageDataUrl;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={onSelect}
      className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${
        isSelected
          ? "ring-4 ring-accent scale-[1.02] shadow-accent"
          : "shadow-card hover:shadow-card-lg hover:scale-[1.01]"
      }`}
    >
      {!imageLoaded && <Skeleton className="absolute inset-0 rounded-2xl" />}

      <img
        src={result.imageDataUrl}
        alt={`Variation ${result.variationId}`}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-sm font-semibold text-foreground">
        {result.variationId}
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
          <Check className="w-5 h-5 text-accent-foreground" />
        </div>
      )}

      {/* Download button - always visible */}
      <button
        onClick={handleDownload}
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-retro-dark/80 backdrop-blur-sm flex items-center justify-center hover:bg-retro-dark transition-colors"
        title="Download this variation"
      >
        <Download className="w-4 h-4 text-retro-cream" />
      </button>

      <div className={`absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent transition-opacity ${
        isSelected ? "opacity-100" : "opacity-0"
      }`} />
    </button>
  );
}

function ProgressIndicator({
  completedCount,
  total,
  isComplete,
}: {
  completedCount: number;
  total: number;
  isComplete: boolean;
}) {
  const percentage = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground">
          {isComplete
            ? 'All variations ready!'
            : `Processing... ${completedCount} of ${total} ready`}
        </p>
        <span className="text-sm font-medium text-foreground">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

// --- Main Component ---

interface PhotoVariationsProps {
  documentType: DocumentType;
  originalPhoto: string;
  onSelectVariation: (index: number, variationData?: PhotoResult) => void;
  onBack: () => void;
  isDemoMode?: boolean;
}

export const PhotoVariations = ({
  documentType,
  originalPhoto,
  onSelectVariation,
  onBack,
  isDemoMode = false,
}: PhotoVariationsProps) => {
  const {
    jobStatus,
    results,
    completedCount,
    totalVariations,
    error,
    submitPhoto,
  } = usePhotoJob({ totalVariations: 4, timeoutMs: 5 * 60 * 1000 });

  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
  const { toast } = useToast();
  const hasSubmitted = useRef(false);

  const documentLabels: Record<DocumentType, string> = {
    passport: "35mm × 45mm",
    visa: "50mm × 50mm",
    id: "Credit Card Size",
  };

  const photoTypeMap: Record<DocumentType, string> = {
    passport: '35mm × 45mm Photo',
    visa: '50mm × 50mm Photo',
    id: 'Credit Card Size Photo',
  };

  // Demo mode - use sample images
  const demoResults: PhotoResult[] = [
    {
      variationId: 1,
      imageDataUrl: 'https://picsum.photos/300/400?random=photo1',
      filename: 'demo-variation-1.jpg',
      mimeType: 'image/jpeg',
      photoType: photoTypeMap[documentType],
    },
    {
      variationId: 2,
      imageDataUrl: 'https://picsum.photos/300/400?random=photo2',
      filename: 'demo-variation-2.jpg',
      mimeType: 'image/jpeg',
      photoType: photoTypeMap[documentType],
    },
    {
      variationId: 3,
      imageDataUrl: 'https://picsum.photos/300/400?random=photo3',
      filename: 'demo-variation-3.jpg',
      mimeType: 'image/jpeg',
      photoType: photoTypeMap[documentType],
    },
    {
      variationId: 4,
      imageDataUrl: 'https://picsum.photos/300/400?random=photo4',
      filename: 'demo-variation-4.jpg',
      mimeType: 'image/jpeg',
      photoType: photoTypeMap[documentType],
    },
  ];

  // Submit on mount
  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    // In demo mode, use demo results immediately
    if (isDemoMode) {
      // Skip the API call entirely and use demo results
      return;
    }

    const testerToken = getTesterToken();
    if (!testerToken) {
      window.location.assign('/unauthorized');
      return;
    }

    let imageBase64 = originalPhoto;
    let mimeType = 'image/png';
    if (originalPhoto.startsWith('data:')) {
      const matches = originalPhoto.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        imageBase64 = matches[2];
      }
    }

    submitPhoto({
      imageBase64,
      mimeType,
      photoType: photoTypeMap[documentType],
      includeShoulders: true,
      testerToken,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show toast for partial completion errors
  useEffect(() => {
    if (error && completedCount > 0 && jobStatus === 'completed') {
      toast({
        title: "Partial results",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, completedCount, jobStatus, toast]);

  const isProcessing = !isDemoMode && (jobStatus === 'submitting' || jobStatus === 'processing');
  const isComplete = isDemoMode || jobStatus === 'completed';
  const isFatalError = !isDemoMode && ((jobStatus === 'failed' || jobStatus === 'timeout') && completedCount === 0);
  const showGrid = !isFatalError;
  const displayCompletedCount = isDemoMode ? 4 : completedCount;

  return (
    <div className="min-h-screen bg-background">

      {/* Demo Mode Indicator */}
      {isDemoMode && (
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-4 shadow-lg mb-8 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Demo Mode Active</h4>
                  <p className="text-sm opacity-90">Using sample variations for testing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Fatal error: no results at all */}
          {isFatalError && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                {jobStatus === 'timeout' ? 'Processing is taking too long' : "Can\u2019t process right now"}
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {error || 'Something went wrong. Please try again.'}
              </p>
              <Button variant="outline" onClick={onBack}>
                Go back
              </Button>
            </div>
          )}

          {/* Progressive grid */}
          {showGrid && (
            <div className="animate-slide-up">
              <ProgressIndicator
                completedCount={displayCompletedCount}
                total={totalVariations}
                isComplete={isComplete}
              />

              <p className="text-center text-muted-foreground mb-6">
                {isComplete
                  ? `Select the variation you prefer. All photos meet ${documentLabels[documentType]} requirements.`
                  : displayCompletedCount > 0
                    ? 'Select a variation as they arrive. More on the way...'
                    : `Our AI is generating ${documentLabels[documentType].toLowerCase()} photo variations...`}
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                {[1, 2, 3, 4].map(vid => {
                  // Use demo results if in demo mode, otherwise use hook results
                  const result = isDemoMode 
                    ? demoResults.find(r => r.variationId === vid)
                    : results.get(vid);
                  return result ? (
                    <VariationCard
                      key={vid}
                      result={result}
                      isSelected={selectedVariationId === vid}
                      onSelect={() => {
                        setSelectedVariationId(vid);
                        onSelectVariation(vid - 1, result);
                      }}
                    />
                  ) : (
                    <VariationSkeleton key={vid} variationId={vid} />
                  );
                })}
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={() => selectedVariationId !== null && onSelectVariation(selectedVariationId - 1)}
                disabled={selectedVariationId === null}
              >
                Continue with Selection
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

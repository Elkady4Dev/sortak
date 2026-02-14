import { PhotoCapture } from "@/components/PhotoCapture";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";

export const PhotoCapturePage = () => {
  const { state, updateState } = usePhotoFlowState();

  const handlePhotoCapture = (photo: string) => {
    updateState({ capturedPhoto: photo, step: 2 });
    window.location.href = '/document-type';
  };

  const handleBack = () => {
    updateState({ step: 0 });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLandingPage={false} />
      <div className="pt-20">
        <PhotoCapture
          onPhotoCapture={handlePhotoCapture}
          onBack={handleBack}
          isDemoMode={state.isDemoMode}
        />
      </div>
    </div>
  );
};

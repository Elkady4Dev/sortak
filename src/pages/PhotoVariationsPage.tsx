import { PhotoVariations } from "@/components/PhotoVariations";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import type { PhotoResult } from "@/hooks/use-photo-job";
import { Navigation } from "@/components/Navigation";

export const PhotoVariationsPage = () => {
  const { state, updateState } = usePhotoFlowState();

  const handleSelectVariation = (index: number, variationData?: PhotoResult) => {
    updateState({ 
      selectedVariation: index, 
      selectedVariationData: variationData || null,
      step: 4 
    });
    window.location.href = '/delivery-confirmation';
  };

  const handleBack = () => {
    updateState({ step: 2 });
    window.location.href = '/document-type';
  };

  if (!state.documentType || !state.capturedPhoto) {
    // Redirect to capture if missing required data
    window.location.href = '/photo-capture';
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLandingPage={false} />
      <div className="pt-20">
        <PhotoVariations
          documentType={state.documentType}
          originalPhoto={state.capturedPhoto}
          onSelectVariation={handleSelectVariation}
          onBack={handleBack}
          isDemoMode={state.isDemoMode}
        />
      </div>
    </div>
  );
};

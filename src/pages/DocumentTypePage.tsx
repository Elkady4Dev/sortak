import { DocumentTypeSelection } from "@/components/DocumentTypeSelection";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";

export const DocumentTypePage = () => {
  const { state, updateState } = usePhotoFlowState();

  const handleSelect = (type: "passport" | "visa" | "id") => {
    updateState({ documentType: type, step: 3 });
    window.location.href = `${import.meta.env.BASE_URL}photo-variations`;
  };

  const handleBack = () => {
    updateState({ step: 1 });
    window.location.href = `${import.meta.env.BASE_URL}photo-capture`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLandingPage={false} />
      <div className="pt-20">
        <DocumentTypeSelection
          onSelect={handleSelect}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

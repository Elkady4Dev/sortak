import { DocumentTypeSelection } from "@/components/DocumentTypeSelection";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";
import { useTokenNavigation } from '@/hooks/useTokenNavigation';

export const DocumentTypePage = () => {
  const { state, updateState } = usePhotoFlowState();
  const { navigateWithToken, getCurrentToken } = useTokenNavigation();

  const handleSelect = (type: "passport" | "visa" | "id") => {
    navigateWithToken('/photo-variations');
    const updates = { documentType: type, step: 3 };
    updateState(updates);

    // Manually flush to localStorage before hard navigation
    const current = JSON.parse(localStorage.getItem('photoFlowState') || '{}');
    localStorage.setItem('photoFlowState', JSON.stringify({ ...current, ...updates }));

    window.location.href = `${import.meta.env.BASE_URL}photo-variations`;
  };

  const handleBack = () => {
    const updates = { step: 1 };
    updateState(updates);

    const current = JSON.parse(localStorage.getItem('photoFlowState') || '{}');
    localStorage.setItem('photoFlowState', JSON.stringify({ ...current, ...updates }));

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

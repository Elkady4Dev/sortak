import { DeliveryConfirmation } from "@/components/DeliveryConfirmation";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";
import { useTokenNavigation } from "@/hooks/useTokenNavigation";

export const DeliveryConfirmationPage = () => {
  const { state, updateState } = usePhotoFlowState();
  const { navigateWithToken } = useTokenNavigation();

  const handleConfirm = () => {
    updateState({ step: 5 });
    navigateWithToken('/success');
  };

  const handleBack = () => {
    updateState({ step: 3 });
    navigateWithToken('/photo-variations');
  };

  if (state.selectedVariation === null) {
    navigateWithToken('/photo-variations');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLandingPage={false} />
      <div className="pt-20">
        <DeliveryConfirmation
          selectedVariation={state.selectedVariation}
          selectedVariationData={state.selectedVariationData}
          wantsPrint={state.wantsPrint}
          setWantsPrint={(wants) => updateState({ wantsPrint: wants })}
          deliveryAddress={state.deliveryAddress}
          setDeliveryAddress={(address) => updateState({ deliveryAddress: address })}
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

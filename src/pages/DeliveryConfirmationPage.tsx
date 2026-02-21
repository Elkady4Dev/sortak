import { useState, useRef } from "react";
import { DeliveryConfirmation } from "@/components/DeliveryConfirmation";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";
import { useTokenNavigation } from "@/hooks/useTokenNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const DeliveryConfirmationPage = () => {
  const { state, updateState } = usePhotoFlowState();
  const { navigateWithToken } = useTokenNavigation();
  const { user } = useAuth();

  const [confirming, setConfirming] = useState(false);
  const hasSubmitted = useRef(false); // prevents duplicate inserts even if called twice

  const handleConfirm = () => {
    // Guard against double-clicks
    if (confirming || hasSubmitted.current) return;
    hasSubmitted.current = true;
    setConfirming(true);

    // Navigate immediately — don't await the DB insert
    updateState({ step: 5 });
    navigateWithToken('/success');

    // Fire-and-forget: save order in the background
    if (user && state.selectedVariationData) {
      const { imageDataUrl, filename, photoType } = state.selectedVariationData;
      const base64 = imageDataUrl.includes(',')
        ? imageDataUrl.split(',')[1]
        : imageDataUrl;

      supabase.from('orders').insert({
        user_id: user.id,
        photo_type: photoType ?? state.documentType ?? 'unknown',
        variation_id: state.selectedVariation ?? 0,
        image_data: base64,
        filename,
        wants_print: state.wantsPrint,
        delivery_address: state.deliveryAddress.trim() || null,
        status: 'completed',
      }).then(({ error }) => {
        if (error) console.error('[DeliveryConfirmationPage] Failed to save order:', error);
      });
    }
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
          confirming={confirming}
        />
      </div>
    </div>
  );
};
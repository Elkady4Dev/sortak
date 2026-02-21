import { useState, useRef } from "react";
import { DeliveryConfirmation } from "@/components/DeliveryConfirmation";
import { usePhotoFlowState } from "@/hooks/usePhotoFlowState";
import { Navigation } from "@/components/Navigation";
import { useTokenNavigation } from "@/hooks/useTokenNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Generates a heavily compressed thumbnail (~2–5 KB) from a full data URL
const generateThumbnail = (dataUrl: string): Promise<string> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 120;
      const scale = MAX_WIDTH / img.width;
      const canvas = document.createElement('canvas');
      canvas.width = MAX_WIDTH;
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      // quality 0.4 = aggressive compression, still recognisable as a thumbnail
      resolve(canvas.toDataURL('image/jpeg', 0.4).split(',')[1]);
    };
    img.src = dataUrl;
  });

export const DeliveryConfirmationPage = () => {
  const { state, updateState } = usePhotoFlowState();
  const { navigateWithToken } = useTokenNavigation();
  const { user } = useAuth();

  const [confirming, setConfirming] = useState(false);
  const hasSubmitted = useRef(false);

  const handleConfirm = async () => {
    if (confirming || hasSubmitted.current) return;
    hasSubmitted.current = true;
    setConfirming(true);

    // Fire-and-forget: generate thumbnail and save order in the background
    if (user && state.selectedVariationData) {
      const { imageDataUrl, filename, photoType } = state.selectedVariationData;

      generateThumbnail(imageDataUrl).then((thumbnailBase64) => {
        supabase.from('orders').insert({
          user_id: user.id,
          photo_type: photoType ?? state.documentType ?? 'unknown',
          variation_id: state.selectedVariation ?? 0,
          image_data: thumbnailBase64,
          filename,
          wants_print: state.wantsPrint,
          delivery_address: state.deliveryAddress.trim() || null,
          status: 'completed',
        }).then(({ error }) => {
          if (error) console.error('[DeliveryConfirmationPage] Failed to save order:', error);
        });
      });
    }

    // Navigate immediately — thumbnail generation and DB insert happen in background
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
          confirming={confirming}
        />
      </div>
    </div>
  );
};
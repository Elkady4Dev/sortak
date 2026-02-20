// src/components/ProfilePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { User, Package, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Display name: prefer full_name from metadata, fallback to email prefix
  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";


  return (
    <div className="min-h-screen grain-overlay bg-retro-cream/50">
      <Navigation isLandingPage={false} />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-retro-red border-[3px] border-retro-dark rounded-lg px-4 py-1.5 shadow-retro-sm mb-6">
              <User className="w-4 h-4 text-retro-cream" />
              <span className="font-display text-sm tracking-wider text-retro-cream">{t('profile.createBadge')}</span>
            </div>
            <h1 className="font-display text-[3rem] md:text-[4.5rem] text-retro-dark leading-[0.9] mb-6 tracking-tight">
              {t('profile.welcome')}
              <br />
              <span className="font-display-serif italic text-retro-red text-[2rem] md:text-[3rem]">
                {displayName}
              </span>
            </h1>
            <p className="text-retro-dark-mid text-lg max-w-2xl mx-auto font-medium mb-2">
              {user?.email}
            </p>
            <p className="text-retro-dark-mid text-base max-w-2xl mx-auto font-medium mb-12">
              {t('profile.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="mt-12 text-center">
              <div className="sticker bg-retro-dark rounded-xl p-8 shadow-retro-lg text-retro-cream">
                <h3 className="font-display text-xl mb-6">{t('profile.accountActions')}</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-[2px] border-retro-cream hover:bg-retro-cream hover:text-retro-dark text-retro-cream"
                    onClick={() => navigate("/photo-capture")}>
                    <Package className="w-5 h-5 mr-2" />{t('profile.newOrder')}
                  </Button>
                  <Button variant="hero" size="lg" className="hover:shadow-retro-hover" onClick={handleSignOut}>
                    <LogOut className="w-5 h-5 mr-2" />{t('profile.signOut')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

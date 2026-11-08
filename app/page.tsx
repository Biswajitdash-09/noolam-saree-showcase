import { Archive } from "@/components/site/archive";
import { BridalCarousel } from "@/components/site/bridal-carousel";
import { Hero } from "@/components/site/hero";
import { MuseFilm } from "@/components/site/muse-film";
import { MuseReels } from "@/components/site/muse-reels";
import { PickSilk } from "@/components/site/pick-silk";
import { Rack } from "@/components/site/rack";
import { SiteFooter } from "@/components/site/site-footer";
import { TryLook } from "@/components/site/try-look";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Archive />
      <TryLook />
      <PickSilk />
      <Rack />
      <MuseFilm />
      <MuseReels />
      <BridalCarousel />
      <SiteFooter />
    </>
  );
}

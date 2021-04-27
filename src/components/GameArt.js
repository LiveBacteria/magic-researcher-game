import { useEffect, useState } from "react";
import BlueFire from "../resources/game_assets/effects/BlueFire.png";
import BrightFire from "../resources/game_assets/effects/BrightFire.png";
import Fel from "../resources/game_assets/effects/Fel.png";
import Fire from "../resources/game_assets/effects/Fire.png";
import FireSpin from "../resources/game_assets/effects/FireSpin.png";
import FlameLash from "../resources/game_assets/effects/FlameLash.png";
import FreezingSpirit from "../resources/game_assets/effects/FreezingSpirit.png";
import Magic8 from "../resources/game_assets/effects/Magic8.png";
import MagicSpell from "../resources/game_assets/effects/MagicSpell.png";
import MagicSpell2 from "../resources/game_assets/effects/MagicSpell2.png";
import Midnight from "../resources/game_assets/effects/Midnight.png";
import Nebula from "../resources/game_assets/effects/Nebula.png";
import Phantom from "../resources/game_assets/effects/Phantom.png";
import ProtectionCircle from "../resources/game_assets/effects/ProtectionCircle.png";
import SunBurn from "../resources/game_assets/effects/SunBurn.png";
import Vortex from "../resources/game_assets/effects/Vortex.png";

export default function GameArt({ sourceName, size }) {
  const [selectedArt, setSelectedArt] = useState();
  useEffect(() => {
    switch (sourceName) {
      case "BlueFire":
        setSelectedArt(BlueFire);
        break;
      case "BrightFire":
        setSelectedArt(BrightFire);
        break;
      case "Fel":
        setSelectedArt(Fel);
        break;
      case "Fire":
        setSelectedArt(Fire);
        break;
      case "FireSpin":
        setSelectedArt(FireSpin);
        break;
      case "FlameLash":
        setSelectedArt(FlameLash);
        break;
      case "FreezingSpirit":
        setSelectedArt(FreezingSpirit);
        break;
      case "Magic8":
        setSelectedArt(Magic8);
        break;
      case "MagicSpell":
        setSelectedArt(MagicSpell);
        break;
      case "MagicSpell2":
        setSelectedArt(MagicSpell2);
        break;
      case "Midnight":
        setSelectedArt(Midnight);
        break;
      case "Nebula":
        setSelectedArt(Nebula);
        break;
      case "Phantom":
        setSelectedArt(Phantom);
        break;
      case "ProtectionCircle":
        setSelectedArt(ProtectionCircle);
        break;
      case "SunBurn":
        setSelectedArt(SunBurn);
        break;
      case "Vortex":
        setSelectedArt(Vortex);
        break;
      default:
        setSelectedArt(MagicSpell);
    }
  }, [sourceName]);

  return <img src={selectedArt} />;
}

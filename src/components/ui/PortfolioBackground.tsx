import GradientWaves from "./GradientWaves/GradientWaves";

interface PortfolioBackgroundProps {
    brightness?: number;
    interactive?: boolean;
}

export default function PortfolioBackground({ brightness = 0.1, interactive = true }: PortfolioBackgroundProps) {
    return (
        <div aria-hidden="true" className={`absolute inset-0 z-0${interactive ? "" : " pointer-events-none"}`}>
            <GradientWaves
                horizonColor="#050505"
                waveColor="#181818"
                crestColor="#FFFFFF"
                speed={0.25}
                amplitude={2.2}
                waveScale={0.6}
                waveRatio={2.5}
                swell={30}
                turbulence={35}
                tilt={1}
                zoom={1.1}
                height={7}
                fogDepth={16}
                detail="medium"
                brightness={brightness}
                opacity={1}
                mouseInteraction
                parallaxStrength={0.35}
                grain={false}
            />
        </div>
    );
}

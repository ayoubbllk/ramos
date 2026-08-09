import { Reveal } from "@/components/animations";

interface Panel {
  image: string;
  alt: string;
}

interface SectorPanelsProps {
  panels: Panel[];
}

export function SectorPanels({ panels }: SectorPanelsProps) {
  return (
    <div className="panels-grid">
      {panels.map((panel, i) => (
        <Reveal key={panel.image} delay={(i % 2) * 100} className="panel-reveal">
          <figure className="panel-card">
            <img src={panel.image} alt={panel.alt} loading="lazy" decoding="async" width={1024} height={576} />
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

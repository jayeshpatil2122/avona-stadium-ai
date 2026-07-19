import { VERIFIED_ROUTES } from "../../constants/stadium";

interface RouteVisualizationProps {
  location: string;
  destination: string;
  hasResult: boolean;
}

function RouteVisualization({
  location,
  destination,
  hasResult,
}: RouteVisualizationProps) {
  const route = VERIFIED_ROUTES[`${location}__${destination}`];

  return (
    <section className="panel route-visualization" aria-labelledby="route-map-title">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Demo Route Graph</p>
          <h2 id="route-map-title">Route Visualization</h2>
        </div>
      </div>

      {hasResult && route ? (
        <ol className="route-rail" aria-label={`Verified demo route from ${location} to ${destination}`}>
          {route.map((point, index) => (
            <li key={`${point}-${index}`}>
              <span className="route-node" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-route">
          <span aria-hidden="true">AI</span>
          <p>Select a supported demo route and run Navigation Intelligence.</p>
          <small>Known route points appear only after a verified route response.</small>
        </div>
      )}
    </section>
  );
}

export default RouteVisualization;

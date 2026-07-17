interface RouteVisualizationProps {
  location: string;
  destination: string;
  hasResult: boolean;
}

const verifiedDemoRoutes: Record<string, string[]> = {
  "Main Entrance__Gate A": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "North Concourse",
    "Gate A",
  ],
  "Main Entrance__Gate B": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "East Concourse",
    "Gate B",
  ],
  "Main Entrance__Medical Center": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "Medical Center",
  ],
  "Gate A__Medical Center": [
    "Gate A",
    "North Concourse",
    "Central Plaza",
    "Medical Center",
  ],
};

function RouteVisualization({
  location,
  destination,
  hasResult,
}: RouteVisualizationProps) {
  const route = verifiedDemoRoutes[`${location}__${destination}`];

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

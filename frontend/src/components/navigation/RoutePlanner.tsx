interface RoutePlannerProps {
  location: string;
  destination: string;
  loading: boolean;
  onLocationChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onSubmit: () => void;
}

const locationOptions = ["Main Entrance", "Gate A"];
const destinationOptions = ["Gate A", "Gate B", "Medical Center"];

function RoutePlanner({
  location,
  destination,
  loading,
  onLocationChange,
  onDestinationChange,
  onSubmit,
}: RoutePlannerProps) {
  return (
    <section className="panel route-planner" aria-labelledby="route-planner-title">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Verified Route Planner</p>
          <h2 id="route-planner-title">Find Intelligent Route</h2>
        </div>
      </div>

      <form
        className="planner-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label>
          <span>Current Location</span>
          <select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
          >
            {locationOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Destination</span>
          <select
            value={destination}
            onChange={(event) => onDestinationChange(event.target.value)}
          >
            {destinationOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-action" type="submit" disabled={loading}>
          <span aria-hidden="true">{loading ? "Scanning" : "Route"}</span>
          {loading ? "Finding Intelligent Route..." : "Find Intelligent Route"}
        </button>
      </form>
    </section>
  );
}

export default RoutePlanner;

interface SystemMetricProps {
  label: string;
  value: string;
  detail: string;
}

function SystemMetric({ label, value, detail }: SystemMetricProps) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export default SystemMetric;

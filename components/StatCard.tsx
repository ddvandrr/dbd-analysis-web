interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatCard({ title, value, subtitle }: Props) {
  return (
    <div className="card">
      <p>{title}</p>
      <h1 style={{ marginTop: 8 }}>{value}</h1>
      {subtitle && <p style={{ marginTop: 8 }}>{subtitle}</p>}
    </div>
  );
}

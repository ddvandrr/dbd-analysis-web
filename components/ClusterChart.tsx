import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

import type { Cluster } from "@/types/cluster";
import { CLUSTER_COLOR } from "@/types/cluster";

interface Props {
  data: {
    ir: number;
    cfr: number;
    cluster: Cluster;
  }[];
}

export default function ClusterChart({ data }: Props) {
  const chartData = {
    datasets: [0, 1, 2].map(cluster => ({
      label: `Cluster ${cluster}`,
      data: data
        .filter(d => d.cluster === cluster)
        .map(d => ({ x: d.ir, y: d.cfr })),
      backgroundColor: CLUSTER_COLOR[cluster as Cluster],
    })),
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: "linear", // ✅ literal type
        title: {
          display: true,
          text: "Incidence Rate (IR)",
        },
      },
      y: {
        type: "linear", // ✅ literal type
        title: {
          display: true,
          text: "Case Fatality Rate (CFR)",
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
}

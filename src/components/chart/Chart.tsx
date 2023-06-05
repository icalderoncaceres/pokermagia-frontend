import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Rentabilidad por mes',
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

interface IProps {
  Enero: number
  Febrero: number
  Marzo: number
  Abril: number
  Mayo: number
  Junio: number
  Julio: number
  Agosto: number
  Septiembre: number
  Octubre: number
  Noviembre: number
  Diciembre: number
}

export function Chart(props: IProps) {
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: labels.map((month: string) => {
          switch (month) {
            case 'Enero':
              return props.Enero;
            case 'Febrero':
              return props.Febrero;
            case 'Marzo':
              return props.Marzo;
            case 'Abril':
              return props.Abril;
            case 'Mayo':
              return props.Mayo;
            case 'Junio':
              return props.Junio;
            case 'Julio':
              return props.Julio;
            case 'Agosto':
              return props.Agosto;
            case 'Septiembre':
              return props.Septiembre;
            case 'Octubre':
              return props.Octubre;
            case 'Noviembre':
              return props.Noviembre;
            case 'Diciembre':
              return props.Diciembre;
            default:
              return '';
          }
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}

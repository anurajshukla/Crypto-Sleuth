import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const HistoryChart = () => {
  const params = useParams();
  const { response } = useAxios(`coins/${params.coinId}/market_chart?vs_currency=usd&days=365`);
  
  if(!response) {
    return (
      <div className="wrapper-container mt-8">
        <div className="animate-pulse">
        </div>
      </div>
    )
  }
  const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
  
  const options = {
    responsive: true
  }
  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: params.coinId,
        data: coinChartData.map(val => val.y),
        borderColor: '#00FFFF',
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }
    ]
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default HistoryChart
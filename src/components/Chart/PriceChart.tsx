import React, { useState } from 'react';
import { useGetPriceDataQuery } from '../../service/coinApi';
import '../../style/PriceChart.scss';
import { Line } from 'react-chartjs-2';
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
import { format } from 'date-fns';
import Loader from "../Loader/Loader";
import {PriceChartProps, PriceDataItem} from "../../types/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PriceChart: React.FC<PriceChartProps> = ({ coinId }) => {
    const [selectedInterval, setSelectedInterval] = useState('m1');

    const { data: priceData, isLoading, isError } = useGetPriceDataQuery({
        coinId,
        interval: selectedInterval,
    }, {
        pollingInterval: 1000,
    });

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error loading price data</div>;
    }

    const transformData = (data: PriceDataItem[] | undefined) => {
        if (!data) {
            return {
                labels: [],
                datasets: [],
            };
        }

        return {
            labels: data.map((item) => format(new Date(item.date), 'yyyy-MM-dd HH:mm')),
            datasets: [
                {
                    label: 'Price (USD)',
                    data: data.map((item) => parseFloat(item.priceUsd)),
                    borderColor: 'rgb(39, 227, 25)',
                    backgroundColor: 'rgba(37, 129, 33, 0.5)',
                    borderWidth: 1.75,
                    pointRadius: 1,
                },
            ],
        };
    };

    return (
        <div className="price-chart-container">
            <h2>Price Chart for {coinId}</h2>
            <select
                value={selectedInterval}
                onChange={(e) => setSelectedInterval(e.target.value)}
            >
                <option value="m1">Day</option>
                <option value="m15">7 Day</option>
                <option value="h1">Month</option>
            </select>
            <Line data={transformData(priceData?.data)} />
        </div>
    );
};

export default PriceChart;

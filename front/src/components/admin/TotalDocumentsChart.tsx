import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

interface MonthlyData {
  month: string;
  count: number;
}

interface ApexChartProps {
  monthlyData?: MonthlyData[];
}

const ApexChart: React.FC<ApexChartProps> = ({ monthlyData = [] }) => {
  const chartData = useMemo(() => {
    // Default data if none provided
    const defaultData = [
      { month: 'Jan', count: 3 },
      { month: 'Feb', count: 5 },
      { month: 'Mar', count: 8 },
      { month: 'Apr', count: 12 },
      { month: 'May', count: 9 },
      { month: 'Jun', count: 10 },
    ];
    
    const data = monthlyData.length > 0 ? monthlyData : defaultData;
    
    // Generate previous month data for comparison (simulate)
    const previousMonthData = data.map(item => ({
      ...item,
      count: Math.max(0, item.count - Math.floor(Math.random() * 5) + 2)
    }));

    return {
      series: [
        {
          name: "Documents - Current Period",
          data: data.map(item => item.count),
        },
        {
          name: "Documents - Previous Period",
          data: previousMonthData.map(item => item.count),
        },
      ],
      options: {
        chart: {
          type: "area" as const,
          height: 200,
          toolbar: {
            show: false,
          },
        },
        colors: ["#3B82F6", "#10B981"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth" as const,
          width: 2,
        },
        xaxis: {
          categories: data.map(item => item.month),
        },
        tooltip: {
          x: {
            format: "MMM",
          },
        },
        fill: {
          type: "gradient" as const,
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
          },
        },
        legend: {
          show: false,
        },
      },
    };
  }, [monthlyData]);

  return (
    <div className="w-full relative">
      <ReactApexChart
        series={chartData.series}
        options={chartData.options}
        type="area"
        height={200}
        width={"100%"}
      />
    </div>
  );
};

export default ApexChart;

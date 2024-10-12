import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export const ChartPie = ({ data }: { data: any[] }) => (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);


import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceData {
  name: string;
  values: number[];
}

interface ComparisonChartProps {
  data: Record<string, number[]>;
  title: string;
  description?: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, title, description }) => {
  // Transform data for Recharts
  const transformedData = Object.keys(data).length > 0 
    ? Array.from({ length: data[Object.keys(data)[0]].length }).map((_, index) => {
        const day = `Day ${index + 1}`;
        const entry: any = { name: day };
        
        Object.keys(data).forEach(route => {
          entry[route] = data[route][index];
        });
        
        return entry;
      })
    : [];

  // Generate colors for each line
  const colors = ['#0EA5E9', '#14B8A6', '#6366F1', '#F97316', '#8B5CF6'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transformedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`$${value}`, 'Price']}
              />
              <Legend />
              {Object.keys(data).map((route, index) => (
                <Line
                  key={route}
                  type="monotone"
                  dataKey={route}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;

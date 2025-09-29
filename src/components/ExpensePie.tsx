import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Expense } from '../models/expense';

const screenWidth = Dimensions.get('window').width;

type Props = { expenses: Expense[] };

const ExpensePie: React.FC<Props> = ({ expenses }) => {
  const byCategory = expenses.reduce<{ [k: string]: number }>((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
  ];

  const data = Object.keys(byCategory).map((k, i) => ({
    name: k,
    amount: byCategory[k],
    color: colors[i % colors.length],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  if (data.length === 0) return <View />;

  return (
    <PieChart
      data={data.map(d => ({
        name: d.name,
        population: d.amount,
        color: d.color,
        legendFontColor: d.legendFontColor,
        legendFontSize: d.legendFontSize,
      }))}
      width={screenWidth - 32}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="16"
      absolute
    />
  );
};

export default ExpensePie;

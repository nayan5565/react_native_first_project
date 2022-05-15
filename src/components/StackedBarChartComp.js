import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width * 0.93;

function StackedBarChartComp(props) {
  const data = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
      [60, 60, 60],
      [30, 30, 60]
    ],
    barColors: ["teal", "#ced6e0", "#a4b0be"]
  };
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#0ff",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    // propsForDots: {
    //     r: "6",
    //     strokeWidth: "2",
    //     stroke: "#ffa726"
    // }
  };
  return (
    <View>
      <Text>StackedBar Chart</Text>
      <StackedBarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}

export default StackedBarChartComp;
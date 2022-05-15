import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width * 0.93;

function BarChartComp(props) {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ],
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
            <Text>Bar Chart</Text>
            <BarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
}

export default BarChartComp;
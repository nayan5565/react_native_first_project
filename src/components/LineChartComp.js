import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width * 0.93;

function LineChartComp(props) {
    const labels = ["January", "February", "March", "April", "May", "June"]
    const datasets = [
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        },

    ]
    const data = {
        labels: labels,
        datasets: datasets
    }
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };
    function BazierChart() {
        return (
            <View>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={data}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        );
    }

    function ChartLine() {
        return (
            <View>
                <Text>Line Chart</Text>
                <LineChart
                    data={data}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}

                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        );
    }

    return (
        <View>
            <BazierChart />
            <ChartLine />
        </View>
    );
}

export default LineChartComp;
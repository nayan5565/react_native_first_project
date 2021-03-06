import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width * 0.93;

function ContributionGraphComp() {
    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
    ];
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
            <Text>ContributionGraph Chart</Text>
            <ContributionGraph
                values={commitsData}
                endDate={new Date("2017-04-01")}
                numDays={105}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    );
}

export default ContributionGraphComp;
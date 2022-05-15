import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width * 0.93;
function ProgressBarComp() {
    const data = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8],

    };
    const chartConfig = {

        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },

    };
    return (
        <View>
            <Text>Progress Ring Chart</Text>
            <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
}

export default ProgressBarComp;
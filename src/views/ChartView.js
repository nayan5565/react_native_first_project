import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import BarChartComp from '../components/BarChartComp';
import ContributionGraphComp from '../components/ContributionGraphComp';
import LineChartComp from '../components/LineChartComp';
import PieChartComp from '../components/PieChartComp';
import ProgressBarComp from '../components/ProgressBarComp';
import StackedBarChartComp from '../components/StackedBarChartComp';

function ChartView() {
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => console.log('Back')} />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify" onPress={() => console.log('Search')} />
                <Appbar.Action icon="dots-vertical" onPress={() => console.log('More')} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
                <View style={{ marginHorizontal: 12 }}>

                    <LineChartComp />
                    <ProgressBarComp />
                    <BarChartComp />
                    <StackedBarChartComp />
                    <PieChartComp />
                    <ContributionGraphComp />
                </View>
            </ScrollView>
        </View>
    );
}

export default ChartView;
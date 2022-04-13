import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Image } from 'react-native';

class ListItemView extends Component {
    listData = [
        { id: '1', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/200/300' },
        { id: '2', title: 'Pakistan', subTitle: 'PAK', img: 'https://picsum.photos/seed/picsum/200/300' },
        { id: '3', title: 'India', subTitle: 'IND', img: 'https://picsum.photos/200/300' },
        { id: '4', title: 'Srilanka', subTitle: 'SRI', img: 'https://picsum.photos/seed/picsum/200/300' },
        { id: '5', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/200/300' },
        { id: '6', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/seed/picsum/200/300' },
        { id: '7', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/200/300' },
        { id: '8', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/seed/picsum/200/300' },
        { id: '9', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/200/300' },
        { id: '10', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/seed/picsum/200/300' },
        { id: '11', title: 'Bangladesh', subTitle: 'BD', img: 'https://picsum.photos/200/300' },
    ];

    ChildView = (title, subTitle, image) => {
        return (
            <View style={{ backgroundColor: 'gray', padding: 10, margin: 5, flex: 100, flexDirection: 'row' }}>
                <View style={{ flex: 20, }}>
                    <Image style={{ height: 60, width: '100%' }} source={{ uri: image }} />
                </View>
                <View style={{ flex: 80, justifyContent: 'center', }}>
                    <Text onPress={this.onClickItem.bind(this, title)} style={{ color: 'white' }}>{title}</Text>
                    <Text>{subTitle}</Text>
                </View>

            </View>
        )
    }

    ChildView = (title, subTitle, image) => {
        return (
            <View style={{ backgroundColor: 'gray', padding: 10, margin: 5, flex: 100, flexDirection: 'row' }}>
                <View style={{ flex: 20, }}>
                    <Image style={{ height: 60, width: '100%' }} source={{ uri: image }} />
                </View>
                <View style={{ flex: 80, justifyContent: 'center', }}>
                    <Text onPress={this.onClickItem.bind(this, title)} style={{ color: 'white' }}>{title}</Text>
                    <Text>{subTitle}</Text>
                </View>

            </View>
        )
    }

    ChildViewColumn = (title, subTitle, image) => {
        return (
            <View style={{ backgroundColor: 'gray', width: 200, height: 200, padding: 10, margin: 5, flexDirection: 'column' }}>
                <View >
                    <Image style={{ height: 100, width: '100%' }} source={{ uri: image }} />
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <Text onPress={this.onClickItem.bind(this, title)} style={{ color: 'white' }}>{title}</Text>
                    <Text>{subTitle}</Text>
                </View>

            </View>
        )
    }
    ChildViewGrid = (title, subTitle, image) => {
        return (
            <View style={{ backgroundColor: 'gray', width: 180, height: 180, padding: 10, margin: 5, flexDirection: 'column' }}>
                <View >
                    <Image style={{ height: 100, width: '100%' }} source={{ uri: image }} />
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <Text onPress={this.onClickItem.bind(this, title)} style={{ color: 'white' }}>{title}</Text>
                    <Text>{subTitle}</Text>
                </View>

            </View>
        )
    }
    onClickItem = (alertTitle) => {
        Alert.alert(alertTitle)
    }
    listView = () => {
        return (
            <FlatList data={this.listData} renderItem={({ item }) => this.ChildView(item.title, item.subTitle, item.img)} />
        )
    }
    listViewHorizantal = () => {
        return (
            <FlatList horizontal={true} data={this.listData} renderItem={({ item }) => this.ChildViewColumn(item.title, item.subTitle, item.img)} />
        )
    }
    listViewGrid = () => {
        return (
            <FlatList keyExtractor={item => item.id} numColumns={2} data={this.listData} renderItem={({ item }) => this.ChildViewGrid(item.title, item.subTitle, item.img)} />
        )
    }
    render() {
        return (
            // this.listViewHorizantal(),
            this.listViewGrid()
            // <this.listView />
        );
    }

}

export default ListItemView;
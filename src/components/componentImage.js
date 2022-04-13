import React from 'react';
import { View, Image } from 'react-native';

function ComponentImage() {
    return (
        <View>
            <Image style={{ height: 200 }} source={require('../assets/images/banner.png')} />
            <Image style={{ height: 200 }} source={{ uri: 'https://picsum.photos/200/300' }} />
        </View>
    );
}

export default ComponentImage;
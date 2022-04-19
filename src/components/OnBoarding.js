import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Animated, Text, useWindowDimensions, View } from 'react-native';
import slides from '../constants/slides';
import NextButton from './NextButton';


const OnBoarding = () => {
    const [currentIndex, setCurrenIndex] = useState(0)
    const { width } = useWindowDimensions()
    const scrollx = useRef(new Animated.Value(0)).current
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log('viewableItemsChanged==>', viewableItems)
        setCurrenIndex(viewableItems[0].index)
    }).current
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const slidesRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            scrollTo();
        }, 4000)
        return () => clearInterval(interval)
    });

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({
                animated: true,
                index: currentIndex + 1
            })
        } else {
            setCurrenIndex(-1)
            // console.log('last item')
        }
    }


    const ItemView = ({ item }) => {
        return (<View style={[styles.container, { width: width }]}>
            <Image source={item.image} style={[styles.image, { width: width, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
            </View>
        </View>)
    }

    const Paginator = ({ data }) => {
        return (<View style={{ flexDirection: 'row', height: 64, justifyContent: 'center', alignItems: 'center' }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const dotWidth = scrollx.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })
                const opacity = scrollx.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />
            })}
        </View>)
    }



    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>

                <FlatList
                    data={slides}
                    renderItem={({ item }) => <ItemView item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfigRef}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    );
}

export default OnBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
    desc: {
        fontWeight: '800',
        fontSize: 12,
        paddingHorizontal: 64,
        color: '#62656b',
        textAlign: 'center'
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8
    },

    button: {
        position: 'absolute',
        backgroundColor: '#f4338f',
        borderRadius: 100,
        padding: 20
    }
})
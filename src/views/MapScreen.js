import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Platform, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import customStyle from '../../customStyle';
import imagePath from '../constants/imagePath';
import { getCurrentLocation, locationPermission } from '../helper/helperFunction';

const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const MapScreen = ({ navigation }) => {
    const mapRef = useRef()
    const markerRef = useRef()
    const [state, setState] = useState({
        currentLocationCords: {
            latitude: 23.7509958,
            longitude: 90.3465982,
        },
        dropLocationCords: {},
        isLoading: false,
        distance: 10.3,
        time: 20.6,
        heading: 0,
        coordinate: new AnimatedRegion({
            latitude: 23.7509958,
            longitude: 90.3465982,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    })
    const { currentLocationCords, heading, distance, time, dropLocationCords, isLoading, coordinate } = state
    const updateState = (data) => setState((state => ({ ...state, ...data })))
    useEffect(() => {
        fetchCurrentLocation();
    }, []);

    const fetchCurrentLocation = async () => {
        const locPermissionGranted = await locationPermission()
        // console.log('locPermissionDenied==>', locPermissionGranted)
        if (locPermissionGranted) {
            const { latitude, longitude, heading } = await getCurrentLocation()
            // console.log('latitude===>', latitude)
            // console.log('heading===>', heading)
            animate(latitude, longitude)
            updateState({
                currentLocationCords: { latitude, longitude },
                heading: heading,
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            })
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCurrentLocation();
        }, 7000)
        return () => clearInterval(interval)
    });


    const GOOGLE_MAPS_APIKEY = 'AIzaSyAS00vBl3FwULFAeHXlD_O1uwVWaOI8RCk';
    const onPressLocation = () => {
        navigation.navigate('ChooseLocation', { getLocation: fetchLocations })
    }
    const fetchLocations = (data) => {
        if (Object.keys(data.pickupCords).length === 0) {
            updateState({

                dropLocationCords: {
                    latitude: data.destinationCords.latitude,
                    longitude: data.destinationCords.longitude
                }
            })
        } else {
            animate(data.pickupCords.latitude, data.pickupCords.longitude)
            updateState({
                currentLocationCords: {
                    latitude: data.pickupCords.latitude,
                    longitude: data.pickupCords.longitude
                },
                dropLocationCords: {
                    latitude: data.destinationCords.latitude,
                    longitude: data.destinationCords.longitude
                }
            })
        }

        // console.log('fetchLocations===>', data)
    }
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude }
        if (Platform.OS === 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000)
            }
        } else {
            coordinate.timing(newCoordinate).start()
        }
    }

    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: currentLocationCords.latitude,
            longitude: currentLocationCords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    const fetchDistanceTime = (d, t) => {
        // setState(state => ({
        //     ...state,
        //     distance: d,
        //     time: t
        // }))
        updateState({
            distance: d,
            time: t
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Distance Left: {distance.toFixed(0)}</Text>
                <Text>Time Left: {time.toFixed(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{ ...currentLocationCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
                >
                    <Marker.Animated ref={markerRef} coordinate={coordinate} >
                        <Image resizeMode='contain' style={{ width: 40, height: 40, transform: [{ rotate: `${heading}deg` }] }} source={imagePath.bike} />
                    </Marker.Animated>
                    {Object.keys(dropLocationCords).length > 0 && (<Marker pinColor='green' coordinate={dropLocationCords} />)}

                    {Object.keys(dropLocationCords).length > 0 && (<MapViewDirections
                        origin={currentLocationCords}
                        destination={dropLocationCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            fetchDistanceTime(result.distance, result.duration)
                            mapRef.current.fitToCoordinates(result.coordinates, {

                                edgePadding: {
                                    // right: 30,
                                    // bottom: 300,
                                    // left: 30,
                                    // top: 100,
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            console.log('routeError==>', errorMessage)
                        }}
                    />)}
                </MapView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 12 }} onPress={onCenter}>
                    <Image style={{ width: 32, height: 32 }} source={imagePath.gps} />
                </TouchableOpacity>
            </View>
            <View style={customStyle.bottomCard}>
                <Text>Where are you going...?</Text>
                <TouchableOpacity
                    style={customStyle.inputStyle}
                    onPress={onPressLocation}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MapScreen;
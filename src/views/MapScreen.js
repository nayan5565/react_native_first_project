import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import customStyle from '../../customStyle';

const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const MapScreen = ({ navigation }) => {
    const [state, setState] = useState({
        pickupLocationCords: {
            latitude: 23.7509958,
            longitude: 90.3465982,
        },
        dropLocationCords: {
            latitude: 23.7780175,
            longitude: 90.3396855
        }
    })
    const { pickupLocationCords, dropLocationCords } = state


    const mapRef = useRef()
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAS00vBl3FwULFAeHXlD_O1uwVWaOI8RCk';
    const onPressLocation = () => {
        navigation.navigate('ChooseLocation', { getLocation: fetchLocations })
    }
    const fetchLocations = (data) => {
        setState({
            pickupLocationCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude
            },
            dropLocationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude
            }
        })
        // console.log('fetchLocations===>', data)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={{ ...pickupLocationCords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
                >
                    <Marker coordinate={pickupLocationCords} />
                    <Marker pinColor='green' coordinate={dropLocationCords} />
                    <MapViewDirections
                        origin={pickupLocationCords}
                        destination={dropLocationCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onReady={result => {
                            mapRef.current.fitToCoordintes(result.coordinate, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 300,
                                    left: 30,
                                    top: 100,
                                }
                            });
                        }}
                    />
                </MapView>

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
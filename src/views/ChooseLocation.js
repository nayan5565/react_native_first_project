import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import customStyle from '../../customStyle';
import AddressPickup from '../components/AddressPickup';
import CustomBtn from '../components/CustomBtn';
import { showError } from '../helper/helperFunction';

const ChooseLocation = (props) => {
    const navigation = useNavigation()
    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })
    const { pickupCords, destinationCords } = state
    const checkValid = () => {
        // if (Object.keys(pickupCords).length === 0) {
        //     showError('Plase pick your pickup location!!')
        //     return false
        // }

        if (Object.keys(destinationCords).length === 0) {
            showError('Plase pick your dest location!!')
            return false
        }
        return true
    }
    const onDone = () => {
        const isValid = checkValid()
        if (isValid) {
            props.route.params.getLocation({
                pickupCords,
                destinationCords
            })
            navigation.goBack()
        }

    }
    const fetchAddressCords = (lat, lng) => {

        setState({
            ...state, pickupCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }
    const fetchDestinationCords = (lat, lng) => {
        console.log('dest lat==>', lat)
        console.log('dest lng==>', lng)
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    // console.log('pickup==>', props)
    // console.log('destination==>', destinationCords)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: 'white', flex: 1, padding: 24 }}>
                <AddressPickup placeholderText='Enter Pickup Location' fetchAddress={fetchAddressCords} />
                <AddressPickup placeholderText='Enter Destination Location' fetchAddress={fetchDestinationCords} />
                <CustomBtn
                    btnText='Done'
                    txtStyle={{ color: 'white' }}
                    btnStyle={{ marginTop: 16, backgroundColor: 'teal', borderRadius: 12, borderColor: 'teal' }}
                    onPress={onDone}
                />
            </ScrollView>

        </View>
    );
}

export default ChooseLocation;
import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import customStyle from '../../customStyle';

const AddressPickup = ({ placeholderText, fetchAddress }) => {
    const onPressAddress = (data, details) => {
        // console.log("Details=====>", details)
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)
    }
    return (
        <View style={[{ flex: 1 }]}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                onPress={onPressAddress}
                fetchDetails={true}
                query={{
                    key: 'AIzaSyBbJR2NYMJ0XMu1MmKQr85ELyRbR3WnLLk',
                    language: 'en',
                }}
                styles={{ textInputContainer: { backgroundColor: 'white' }, textInput: customStyle.input }}
            />
        </View>
    );
}

export default AddressPickup;
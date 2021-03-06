import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default ApiCallInFunctionComponent = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            console.log('Response: ' + response)
            setData(json.movies);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getMovies2 = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://reactnative.dev/movies.json", requestOptions)
            .then(response => response.json())
            .then(result => setData(result.movies))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Text>{item.title}, {item.releaseYear}</Text>
                    )}
                />
            )}
        </View>
    );
};
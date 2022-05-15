import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';


function SearchView() {
    const [filterList, setFilterList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState(false)
    const initialList = [
        { id: '1', title: 'Bangladesh', code: 'BD' },
        { id: '2', title: 'Pakistan', code: 'PAK' },
        { id: '3', title: 'India', code: 'IND' },
        { id: '4', title: 'Srilanka', code: 'SRI' },
        { id: '5', title: 'Australlia', code: 'AUS' },
        { id: '6', title: 'Brazil', code: 'BRA' },
        { id: '7', title: 'Argentina', code: 'ARG' },
        { id: '8', title: 'England', code: 'ENG' },
    ];


    const onChangeSearch = query => {
        setSearchQuery(query)
        console.log('Search==>', query)
        if (query.length > 0) {
            setSearch(true)
            let filteredData = initialList.filter(function (item) {
                return item.title.toLowerCase().includes(query.toLowerCase());
            });

            setFilterList(filteredData)
            console.log('Filter==>', JSON.stringify(filterList))
        } else setSearch(false)

    };


    const ChildView = (title, subTitle) => {
        return (
            <View style={{ backgroundColor: 'teal', borderRadius: 12, padding: 10, margin: 5, flex: 100, flexDirection: 'row' }}>

                <View style={{ flex: 80, justifyContent: 'center', }}>
                    <Text style={{ color: 'white' }}>{title}</Text>
                    <Text style={{ color: 'white' }}>{subTitle}</Text>
                </View>

            </View>
        )
    }
    const BuildListView = () => {
        return (
            <FlatList contentContainerStyle={{ paddingVertical: 12 }} data={search ? filterList : initialList} renderItem={({ item }) => ChildView(item.title, item.code)} />
        )
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 8, marginTop: 12 }}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <BuildListView />
        </View>
    );
}

export default SearchView;
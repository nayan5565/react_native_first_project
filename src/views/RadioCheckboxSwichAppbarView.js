import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Surface, Text, FAB, Checkbox, ProgressBar, Colors, ToggleButton, Appbar, RadioButton, Searchbar, BottomNavigation } from 'react-native-paper';


const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

function RadioCheckboxSwichView() {
    const [checked, setChecked] = useState(false);
    const [status, setStatus] = useState('checked');
    const [value, setValue] = useState('first');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'music', title: 'Music', icon: 'music' },
        { key: 'albums', title: 'Albums', icon: 'album' },
        { key: 'recents', title: 'Recents', icon: 'history' },
    ]);

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');



    const renderScene = BottomNavigation.SceneMap({
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
    });

    const onChangeSearch = query => {
        setSearchQuery(query)
        console.log('Search==>', query)
    };
    const onButtonToggle = value => {
        setStatus(status === 'checked' ? 'unchecked' : 'checked');
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Surface style={styles.surface}>
                <Text>Surface</Text>
            </Surface>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
            <Switch
                style={{ width: 80, }}
                trackColor={{ false: "#767577", true: Colors.teal300 }}
                thumbColor={isEnabled ? Colors.teal900 : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />

            <ToggleButton
                icon="bluetooth"
                value="bluetooth"
                status={status}
                onPress={onButtonToggle}
            />

            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                <RadioButton.Item position='leading' label="First item" value="first" />
                <RadioButton.Item position='leading' label="Second item" value="second" />
            </RadioButton.Group>

            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>First</Text>
                    <RadioButton value="first" />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Second</Text>
                    <RadioButton value="second" />
                </View>
            </RadioButton.Group >
            <ProgressBar progress={0.7} color={Colors.red800}
                style={{ height: 10, marginHorizontal: 12, borderRadius: 8 }} />
            <FAB.Group
                open={open}
                icon={open ? 'calendar-today' : 'plus'}
                color={'white'}
                fabStyle={{ backgroundColor: 'teal' }}

                actions={[
                    { icon: 'plus', onPress: () => console.log('Pressed add') },
                    {
                        icon: 'star',
                        label: 'Star',
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        icon: 'email',
                        label: 'Email',
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'bell',
                        label: 'Remind',
                        onPress: () => console.log('Pressed notifications'),
                        small: false,
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />
            {/* <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            /> */}
        </View >
    );
}

export default RadioCheckboxSwichView;

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        margin: 12,
        height: 80,
        width: 80,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
    },
});
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Switch, Title, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function DrawerContent({ props, navigation }) {
    const [isDarkTheme, setDarkTheme] = useState(false)
    const toggleTheme = () => {
        setDarkTheme(!isDarkTheme)
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 16 }}>
                            <Avatar.Image source={{ uri: 'https://picsum.photos/200/300' }} size={50} />
                            <View style={{ marginLeft: 16 }}>
                                <Title style={styles.title}>Nayan</Title>
                                <Caption style={styles.caption}>nayan@gmail.com</Caption>
                            </View>

                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Fllowing</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Fllowers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem icon={({ color, size }) => (
                            <Icon
                                name='home-outline'
                                color={color}
                                size={size} />)}
                            label='Home'
                            onPress={() => { navigation.navigate('Home') }}
                        />
                        <DrawerItem icon={({ color, size }) => (
                            <Icon
                                name='account-outline'
                                color={color}
                                size={size} />)}
                            label='Profile'
                            onPress={() => { navigation.navigate('Database') }}
                        />
                        <DrawerItem icon={({ color, size }) => (
                            <Icon
                                name='bookmark-outline'
                                color={color}
                                size={size} />)}
                            label='Bookmarks'
                            onPress={() => { navigation.navigate('Splash') }}
                        />
                        <DrawerItem icon={({ color, size }) => (
                            <Icon
                                name='set-square'
                                color={color}
                                size={size} />)}
                            label='Settings'
                            onPress={() => { navigation.navigate('Login') }}
                        />
                        <DrawerItem icon={({ color, size }) => (
                            <Icon
                                name='account-check-outline'
                                color={color}
                                size={size} />)}
                            label='Support'
                            onPress={() => { }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title='Prefrences'>
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({ color, size }) => (
                    <Icon
                        name='exit-to-app'
                        color={color}
                        size={size} />)}
                    label='Sign out'
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 16,
    },
    bottomDrawerSection: {
        marginBottom: 16,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default DrawerContent;
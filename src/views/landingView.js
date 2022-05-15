import React, { Component } from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import customStyle from '../../customStyle'

class LandingView extends Component {

    state = { name: 'Nayan', city: 'Dhaka' }
    change = () => {
        this.setState({ name: 'Nurul', city: 'Narail' })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, padding: 12 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <Button
                            title="Utils"
                            onPress={() => this.props.navigation.navigate('Utils')}
                        />
                        <Button
                            title="Home"
                            onPress={() => this.props.navigation.navigate('Home')}
                        />
                        <Button
                            title="Firebase"
                            onPress={() => this.props.navigation.navigate('FirebaseAuthDesign')}
                        />
                        <Button
                            title="Download"
                            onPress={() => this.props.navigation.navigate('Download')}
                        />
                        <Button
                            title="Dropdown"
                            onPress={() => this.props.navigation.navigate('Dropdown')}
                        />
                        <Button
                            title="Phone Input Field"
                            onPress={() => this.props.navigation.navigate('PhoneField')}
                        />
                        <Button
                            title="OTP Input Field"
                            onPress={() => this.props.navigation.navigate('OTP')}
                        />
                        <Button
                            title="Drawer"
                            onPress={() => this.props.navigation.navigate('Drawer')}
                        />
                        <Button
                            title="Radio Checkbox Swich"
                            onPress={() => this.props.navigation.navigate('Radio')}
                        />
                        <Button
                            title="Chart"
                            onPress={() => this.props.navigation.navigate('Chart')}
                        />
                        <Button
                            title="Screenshot"
                            onPress={() => this.props.navigation.navigate('Screenshot')}
                        />
                        <Button
                            title="Pick File"
                            onPress={() => this.props.navigation.navigate('PickFile')}
                        />
                        <Button
                            title="Audo Player"
                            onPress={() => this.props.navigation.navigate('AudioPlayer')}
                        />

                        <Button
                            title="Video Player"
                            onPress={() => this.props.navigation.navigate('VideoPlayer')}
                        />
                        <Button
                            title="Push Notification"
                            onPress={() => this.props.navigation.navigate('PushNotification')}
                        />
                        <Button
                            title="Bottom Tab"
                            onPress={() => this.props.navigation.navigate('BottomTab')}
                        />
                        <Button
                            title="Bottom Sheet and pick image"
                            onPress={() => this.props.navigation.navigate('BottomSheet')}
                        />
                        <Button
                            title="Tab Bar"
                            onPress={() => this.props.navigation.navigate('TabBar')}
                        />
                        <Button
                            title="Custom Bottom Tab"
                            onPress={() => this.props.navigation.navigate('CustomBottomTab')}
                        />
                        <Button
                            title="On Boarding"
                            onPress={() => this.props.navigation.navigate('OnBoard')}
                        />
                        <Button
                            title="Map"
                            onPress={() => this.props.navigation.navigate('Map')}
                        />
                        <Button
                            title="Redux"
                            onPress={() => this.props.navigation.navigate('Redux')}
                        />
                        <Button
                            title="Redux Hook"
                            onPress={() => this.props.navigation.navigate('ReduxHook')}
                        />
                        {/* <ComponentTwo name="Nayan" city='Dhaka' />
                        <ComponentThree name="Nurul" city='Narail' /> */}
                        <Button
                            title="ApiCall"
                            onPress={() => this.props.navigation.navigate('Api')}
                        />
                        <Button
                            title="Database"
                            onPress={() => this.props.navigation.navigate('Database')}
                        />
                        <Button
                            title="ApiFunc"
                            onPress={() => this.props.navigation.navigate('ApiFunc')}
                        />
                        <Button
                            title="ListView"
                            onPress={() => this.props.navigation.navigate('List')}
                        />
                        <Button
                            title="Login"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                        {/* <Button
                            title="Go to Details"
                            onPress={() => this.props.navigation.navigate('Details', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                            })}
                        /> */}
                        {/* <ComponentImage /> */}
                    </View>
                </ScrollView>

            </SafeAreaView>



        );
    }
}

export default LandingView;
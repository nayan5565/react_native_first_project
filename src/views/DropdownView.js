import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';
import { Menu, Button, Divider, Provider } from 'react-native-paper';
import imagePath from '../constants/imagePath';
import IonIcons from 'react-native-vector-icons/Ionicons'


const countries = ["Egypt", "Canada", "Australia", "Ireland"]
const cities = [{ name: 'Dhaka', id: '1' },
{ name: 'Khulna', id: '2' }]
const itemData = [{ label: 'Apple', value: 'apple' },
{ label: 'Banana', value: 'banana' }]


function DropdownView(props) {
    const [city, setCity] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    useEffect(() => {
        setItems(itemData)
    }, [])

    return (
        <Provider>
            <View>

                <Menu

                    style={{ width: '30%', left: '65%', }}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button style={{ width: '20%', left: '80%', top: 16, right: 24 }} onPress={openMenu}><IonIcons name='ios-menu-sharp' size={24} color='grey' /></Button>}>
                    <Menu.Item onPress={() => closeMenu()} title="Item 1" />
                    <Menu.Item onPress={() => closeMenu()} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => closeMenu()} title="Item 3" />
                </Menu>


                <View style={{ margin: 12 }}>
                    <SelectDropdown
                        data={cities}
                        onSelect={(selectedItem, index) => {
                            setCity(selectedItem.name)
                            console.log('onSelect==>', selectedItem, index)
                        }}
                        dropdownStyle={{ width: '90%', borderRadius: 12, justifyContent: 'space-between', marginRight: 12 }}
                        buttonStyle={{ width: '100%', borderRadius: 8, justifyContent: 'space-between', borderColor: 'grey', borderWidth: 1, backgroundColor: 'white' }}
                        buttonTextStyle={{ color: 'red', justifyContent: 'space-between' }}
                        dropdownIconPosition='right'
                        rowTextStyle={{ color: 'green' }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            // console.log('buttonTextAfterSelection==>', selectedItem);
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            // console.log('rowTextForSelection==>', item);
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.name
                        }}
                    />
                </View>
                <View style={{ margin: 12 }}>
                    <DropDownPicker

                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        searchable={false}
                        onChangeValue={(value) => {
                            console.log('onChangeValue==>', value);
                        }}
                        onSelectItem={(item) => {
                            console.log('onSelectItem==>', item.value);
                        }}
                        style={{
                            backgroundColor: "white"
                        }}
                        disabledStyle={{
                            opacity: 0.5
                        }}
                        labelStyle={{
                            fontWeight: "bold"
                        }}
                        listMode="FLATLIST"
                        itemSeparator={true}
                        itemSeparatorStyle={{
                            backgroundColor: "grey"
                        }}
                        closeOnBackPressed={true}
                        // selectedItemContainerStyle={{
                        //     backgroundColor: "green"
                        // }}
                        selectedItemLabelStyle={{
                            fontWeight: "bold",
                            color: 'green'
                        }}

                    />
                </View>
                <Text style={{ textAlign: 'center' }}>Select Country: {city}</Text>
                <Text style={{ textAlign: 'center' }}>Select Item: {value}</Text>

            </View>
        </Provider>
    );
}

export default DropdownView;
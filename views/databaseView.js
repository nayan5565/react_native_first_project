import React, { useEffect, useState } from "react";
import { SafeAreaView, Alert, FlatList, Modal, Pressable, View, Text, Button, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import customStyle from '../customStyle';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'MainDB',
    location: 'default',
},
    () => { },
    error => { console.log(error) }
);

const DatabaseView = ({ navigation }) => {

    const [isLoading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, onChangeName] = useState("");
    const [phone, onChangePhone] = useState('');
    const [nameUpdate, onChangeNameUpdate] = useState("");
    const [phoneUpdate, onChangePhoneUpdate] = useState('');
    const [id, setId] = useState('');
    const [bloodGroupUpdate, onChangeGroupUpdate] = useState('');
    const [bloodGroup, onChangeGroup] = useState('');
    const [data, setData] = useState([]);

    const onLogin = async (email, password) => {
        setLoading(true)
        console.log('name: ' + name + 'phone: ' + phone);
        // loginApi()
        // getMovies2()
    };


    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, bloodGroup TEXT, Phone TEXT);"
            )
        })
    }

    /**
  * Execute sql queries
  * 
  * @param sql
  * @param params
  * 
  * @returns {resolve} results
  */
    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });
    /**
     * Delete Query Example
     */
    const deleteData = async (ID) => {
        let deleteQuery = await ExecuteQuery('DELETE FROM Users WHERE ID = ?', [ID]);
        console.log("delete: " + deleteQuery);
        getData()
    }

    const saveData = async () => {
        if (!name || !phone || !bloodGroup) {
            alert('enter name and phone');
            return false;
        }
        setLoading(true)
        console.log('name: ' + name + 'phone: ' + phone);
        await db.transaction(async (tx) => {

            await tx.executeSql("INSERT INTO Users (Name, bloodGroup, Phone) VALUES (?,?,?)",
                [name, bloodGroup, phone],
                (tx, results) => {
                    console.log('Successfully save');
                    onChangeName('')
                    onChangePhone('')
                    onChangeGroup('')
                    getData()
                },
                error => { setLoading(false); console.log('Save error: ' + error.message) }
            );

        })


    }

    const updateData = async (ID) => {
        if (!nameUpdate || !phoneUpdate || !bloodGroupUpdate) {
            alert('enter name and phone');
            return false;
        }
        setLoading(true)
        console.log('name: ' + nameUpdate + 'phone: ' + phoneUpdate);
        await db.transaction(async (tx) => {

            await tx.executeSql("UPDATE Users SET Name = ? , Phone = ? , bloodGroup = ? WHERE ID = ?",
                [nameUpdate, phoneUpdate, bloodGroupUpdate, ID],
                (tx, results) => {
                    alert('Successfully Update');
                    getData()
                },
                error => { setLoading(false); console.log('Update error: ' + error.message) }
            );

        })
    }
    const deleteData2 = async (ID) => {
        setLoading(true)
        await db.transaction(async (tx) => {

            await tx.executeSql("DELETE FROM Users WHERE ID = ?",
                [ID],
                (tx, results) => {
                    console.log('Successfully Deleted');
                    getData()
                },
                error => { setLoading(false); console.log('Deleted error: ' + error.message) }
            );

        })
    }

    const getData = () => {
        setLoading(true)
        db.transaction((tx) => {

            tx.executeSql("SELECT * FROM Users ORDER BY ID DESC",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    // console.log("len: " + JSON.stringify(results.rows.item(0)))
                    var users = [];
                    if (len > 0) {

                        for (var i = 0; i < len; i++) {
                            var item = results.rows.item(i);
                            users.push({ ID: item.ID, Name: item.Name, Phone: item.Phone, bloodGroup: item.bloodGroup })
                        }


                        // var userName = results.rows.item(0).Name;
                        // console.log("userName " + userName)
                        // setName(userName);
                        // setData(results)
                    }
                    setData(users);
                    setLoading(false)
                },
                error => { setLoading(false); console.log('getting error: ' + error.message) }
            );

        })
    }

    const createTwoButtonAlert = (ID, name) =>
        Alert.alert(
            "Delete!!",
            "Do you want to delete " + name + '?',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: () => onDeleteItem(ID) },

            ]
        );

    const childView = (name, phone, bloodGroup, ID) => {
        return (
            <View style={{ backgroundColor: 'white', elevation: 5, borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 6, marginLeft: 12, marginRight: 12, flex: 100, flexDirection: 'row', justifyContent: "center" }}>

                <View style={{ flex: 80, justifyContent: 'center', }}>
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ color: 'gray', fontWeight: '500', marginTop: 4 }}>{phone}</Text>
                    <Text style={{ color: 'gray', fontWeight: '500', marginTop: 4 }}>{bloodGroup}</Text>
                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Pressable
                        style={[customStyle.buttonItem, customStyle.buttonClose]}
                        onPress={showModal.bind(this, ID, name, phone, bloodGroup)}
                    >
                        <Text style={customStyle.textStyle}>Update</Text>
                    </Pressable>
                    <Pressable
                        style={[customStyle.buttonItem, { marginTop: 4, }, customStyle.buttonCancel, { marginEnd: 8 }]}
                        onPress={createTwoButtonAlert.bind(this, ID, name)}
                    >
                        <Text style={customStyle.textStyle}>Delete</Text>
                    </Pressable>

                </View>


            </View>
        )

    }

    const showModal = (ID, name, phone, bloodGroup) => {
        setId(ID)
        onChangeNameUpdate(name)
        onChangePhoneUpdate(phone)
        onChangeGroupUpdate(bloodGroup)
        setModalVisible(true)
    }

    const onUpdateItem = (ID) => {
        updateData(ID)
        setModalVisible(false)
    }
    const onDeleteItem = (ID) => {
        deleteData2(ID)

    }

    const listView = () => {
        return (
            <FlatList contentContainerStyle={{ paddingBottom: 0 }}
                keyExtractor={item => item.ID} data={data} renderItem={({ item }) => { return childView(item.Name, item.Phone, item.bloodGroup, item.ID) }} />
        )
    }

    useEffect(() => {

        createTable()
        getData()
    }, []);
    return (


        <View style={{ marginTop: 12 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }} >
                <View style={customStyle.centeredView}>
                    <View style={customStyle.modalView}>
                        <Text style={customStyle.modalText}>Update Data</Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                margin: 12,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 10,
                            }}
                            onChangeText={onChangeNameUpdate}
                            value={nameUpdate}
                            placeholder="Name"
                            keyboardType="default"
                        />
                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                margin: 12,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 10,
                            }}
                            onChangeText={onChangePhoneUpdate}
                            placeholder="Phone"
                            returnKeyType='next'
                            keyboardType="phone-pad"
                            value={phoneUpdate}
                        />

                        <TextInput
                            style={{
                                width: '100%',
                                height: 40,
                                margin: 12,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 8,
                                padding: 10,
                            }}
                            onChangeText={onChangeGroupUpdate}
                            placeholder="Blood Group"
                            returnKeyType='done'
                            keyboardType="default"
                            value={bloodGroupUpdate}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[customStyle.button, customStyle.buttonCancel, { marginEnd: 8 }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={customStyle.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[customStyle.button, customStyle.buttonClose]}
                                onPress={() => onUpdateItem(id)}
                            >
                                <Text style={customStyle.textStyle}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <TextInput
                style={customStyle.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
                keyboardType="default"
            />

            <TextInput
                style={customStyle.input}
                onChangeText={onChangePhone}
                placeholder="Phone"
                returnKeyType='next'
                keyboardType="phone-pad"
                value={phone}
            />

            <TextInput
                style={customStyle.input}
                onChangeText={onChangeGroup}
                placeholder="Blood Group"
                returnKeyType='done'
                keyboardType="default"
                value={bloodGroup}
            />

            <TouchableOpacity style={customStyle.SubmitButtonStyle}
                activeOpacity={.5}
                onPress={() => saveData()}>

                {isLoading ? <ActivityIndicator color='white' /> : <Text style={customStyle.TextStyle}>Save</Text>}

            </TouchableOpacity>

            {listView()}

        </View>

    );
};


export default DatabaseView;
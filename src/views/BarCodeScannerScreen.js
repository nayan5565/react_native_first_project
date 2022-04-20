import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';



const BarCodeScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [barcodeResults, setBarcodeResults] = useState([]);




  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
}

export default BarCodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNSpeedMeter from 'react-native-speedometer';

const Spends = () => {
    const [value, setValue] = useState(0);
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
      
    useEffect(() => {
        setValue(getRandomInt(100));
    },[]);

    return(
        <View style={styles.rootView}>
            <Text style={styles.heading}>Total Savings This Month</Text>
            <RNSpeedMeter value={value} size={300} easwDuration={1000} />
        </View>
    )
}

const styles = StyleSheet.create({
    rootView : {
        alignItems: "center"
    },
    heading: {
        fontSize : 20,
        marginBottom : 15,
        marginTop : 10,
    }
})

export default Spends;
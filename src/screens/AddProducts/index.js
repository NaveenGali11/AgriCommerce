import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import {Dropdown} from "react-native-element-dropdown";

const AddProducts = ({navigation,route}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [quantity, setQuantity] = useState("");

    
    const data = [
        { label: 'Fruits', value: 'fruit' },
        { label: 'Vegetables', value: 'vegetable' },
        { label: 'Leafy Vegetable', value: 'leafyvegetable' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Exotic', value: 'exotic' },
        { label: 'Flowers', value: 'flowers' },
        { label: 'Others', value: 'others' },
    ];

    return (
        <ScrollView>
            <Text style={styles.heading}>Add your farm fresh products from here!</Text>
            <View style={styles.formContainer}>
                <TextInput label="Name Of Product" value={route.params ? route.params.name : name} onChange={(text) => setName(text)} mode="outlined" style={styles.formField} />
                <TextInput label="Price" value={price} onChange={(text) => setPrice(text)} mode="outlined" style={styles.formField} keyboardType="number-pad" />
                <Text style={styles.formFieldIndicator}>Product Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Category' : '...'}
                    searchPlaceholder="Search..."
                    value={route.params.type}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setType(item.value)
                        setIsFocus(false)
                    }}
                    disable
                />
                <TextInput label="Quantity" value={quantity} onChange={(text) => setQuantity(text)} mode="outlined" style={styles.formField} keyboardType="number-pad" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    heading : {
        fontSize : 22,
        textAlign : "center",
        marginTop : 10,
        fontWeight : "bold"
    },
    formContainer: {
        marginHorizontal : 10,
        marginVertical : 10
    },
    formFieldIndicator : {
        fontSize : 15,
        marginBottom : 10
    },
    formField: {
        marginVertical : 10
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:"white"
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
  
})

export default AddProducts;
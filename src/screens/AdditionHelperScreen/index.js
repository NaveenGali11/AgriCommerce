import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from "react-native-element-dropdown";
import { Storage,API } from "aws-amplify";
import { Button } from 'react-native-paper';
import * as queries from "../../graphql/queries";


const AdditionHelperScreen = (props) => {
    const [productType, setProductType] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [data, setData] = useState([]);

    const getCategories = async () => {
        await API.graphql({
            query: queries.listCategories,
        }).then((res) => {
            console.log("ALL Categories REsponse :- ",res.data.listCategories.items);
            setData(res.data.listCategories.items);
        },(err) => {
            console.log("ERR");
        })
    }
    useEffect(() => {
        getCategories();
    },[])

    // const data = [
    //     { label: 'Fruits', value: 'fruit' },
    //     { label: 'Vegetables', value: 'vegetable' },
    //     { label: 'Leafy Vegetable', value: 'leafyvegetable' },
    //     { label: 'Seasonal', value: 'seasonal' },
    //     { label: 'Exotic', value: 'exotic' },
    //     { label: 'Flowers', value: 'flowers' },
    //     { label: 'Others', value: 'others' },
    // ];

    return(
        <View style={styles.rootView}>
            <View style={styles.headingView}>
                <Text style={styles.heading}>Add Products through any process</Text>
            </View>
            <View style={{
                marginHorizontal : 10,
            }}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={productType}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setProductType(item.id)
                        console.log(item.name);
                        setIsFocus(false)
                    }}
                />
            </View>
            {
                productType !== "" ? (
                    <View>
                        <TouchableOpacity style={styles.methodView} onPress={() => props.navigation.navigate('Camera',{
                            type: productType,
                            mode: 'recognizer'
                        })}>
                            <Ionicons name='scan-circle-outline' color="#416422" size={50} style={{
                                marginRight : 10
                            }} />
                            <Text style={styles.methodText}>Using Object Recognizer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.methodView,marginBottom:15}} onPress={() => props.navigation.navigate('ProductsAdd',{
                            type: productType,
                            mode: 'manually'
                        })}>
                            <Ionicons name='cloud-upload' color="#416422" size={50} style={{
                                marginRight : 10
                            }} />
                            <Text style={styles.methodText}>Add Manually</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View></View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    rootView : {
        height : '100%',
        width : '100%',
        justifyContent : 'space-evenly'
    },
    methodView : {
        flexDirection:'row',
        justifyContent : "center",
        alignItems:'center',
        marginVertical : 7,
        borderWidth : 1,
        marginHorizontal : 30,
        padding : 15,
        borderRadius : 10,
    },
    heading : {
        textAlign : 'center',
        fontSize : 30,
        color : "#416422",
        fontWeight : '600'
    },
    methodText : {
        fontSize : 17,
        textAlign:'justify',
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:"white"
    },
})

export default AdditionHelperScreen;
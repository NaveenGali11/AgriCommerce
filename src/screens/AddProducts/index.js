import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import {Dropdown} from "react-native-element-dropdown";
import {API,Auth,Storage} from "aws-amplify";
import * as queries from "../../graphql/queries";
import ImagePicker from "react-native-image-crop-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as mutations from "../../graphql/mutations";

const AddProducts = ({navigation,route}) => {
    const [name, setName] = useState(route.params.name ? route.params.name : "");
    const [price, setPrice] = useState("");
    const [type, setType] = useState(route.params.type ? route.params.type : null);
    const [isFocus, setIsFocus] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState("");

    const getUserDetails = async () => {
        const user = await Auth.currentUserInfo();
        setUserName(user.username);
    }

    useEffect(() => {
        getUserDetails();
    },[])

    const getCategories = async () => {
        await API.graphql({
            query: queries.listCategories,
        }).then((res) => {
            console.log("ALL Categories REsponse :- ",res.data.listCategories.items);
            setCategories(res.data.listCategories.items);
        },(err) => {
            console.log("ERR",err);
        })
    }

    const pickImage = async () => {
        ImagePicker.openCamera({
            height: 300,
            width : 200,
            mediaType:"photo",
            compressImageQuality:0.8
        }).then((res) => {
            console.log("RES :_ ",res);
            setImages([res.path]);
        },(err) => {
            console.log("ERR :_ ",err);
        })
    }

    // const uploadImageToStorage = async () => {
    //     const response = await fetch(images[0]);
    //     const blob = await response.blob();
    //     console.log("BLOB :_ ",blob);
    //     await Storage.put(name+'.jpg',blob,{
    //         contentType: 'image/jpeg'
    //     }).then((res) => {
    //         console.log("RES :_ ",res);
    //     },(err) => {
    //         console.log("ERR :- ",err);
    //     })
    // }

    const addProductApiCall = async () => {
        setIsLoading(true);
        let imageKey = "";
        const response = await fetch(images[0]);
        const blob = await response.blob();
        console.log("BLOB :_ ",blob);
        await Storage.put(name+'.jpg',blob,{
            contentType: 'image/jpeg'
        }).then((res) => {
            console.log("RES :_ ",res);
            imageKey = res.key;
        },(err) => {
            console.log("ERR :- ",err);
        })

        const product = {
            "name" : name,
            "category" : type,
            "quantity" : quantity,
            "userId": userName,
            "image": imageKey,
            "price": price
        }

        console.log("PD :- ",product);

        await API.graphql({
            query : mutations.createProducts,
            variables: {input : product}
        }).then((res) => {
            console.log("Prodcut Add RES :_ ",res);
            setIsLoading(false);
            navigation.goBack();
        },(err) => {
            console.log("ERR :_ ",err);
            Alert.alert("Product Addition Failed!","Try After Some Time");
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getCategories();
    },[])

    return (
        <ScrollView>
            <Text style={styles.heading}>Add your farm fresh products from here!</Text>
            <View style={styles.formContainer}>
                <TextInput label="Name Of Product" value={route.params ? route.params.name : name} onChangeText={(text) => {
                    console.log("TEXT :- ",text);
                    setName(text)
                }} mode="outlined" style={styles.formField} />
                <TextInput label="Price" value={price} onChangeText={(text) => setPrice(text)} mode="outlined" style={styles.formField} keyboardType="number-pad" maxLength={6} />
                <Text style={{textAlign:"right"}}>In Kg's</Text>
                <Text style={styles.formFieldIndicator}>Product Type</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={categories}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={!isFocus ? 'Select Category' : '...'}
                    searchPlaceholder="Search..."
                    value={route.params.type}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        console.log("ITEM ON :- ",item.id);
                        setType(item.id);
                        setIsFocus(false);
                    }}
                    disable={route.params.mode === 'manually' ? false : true}
                />
                <TextInput label="Quantity" value={quantity} onChangeText={(text) => setQuantity(text)} mode="outlined" style={styles.formField} keyboardType="number-pad" />
                <Text style={{textAlign:"right"}}>In Kg's</Text>
                <Text style={styles.formFieldIndicator}>Add Product Images</Text>
                {
                    images.length !== 0 ? (
                        <View style={{alignItems: "center",marginBottom : 10}}>
                            <Ionicons name="close-circle-outline" size={30} style={{position: "relative"}} onPress={() => setImages([])} />
                            <Image source={{uri : images[0]}} style={{width: 200,height : 200,overflow:"visible"}} resizeMethod="scale" resizeMode="cover"  />
                        </View>
                        ) : <View></View>
                }
                <Button icon="camera-plus" mode="outlined" onPress={() => pickImage()} disabled={name.length === 0 ? true : false}>
                    Add Images
                </Button>
            </View>
            <View style={styles.addProductContainer}>
                <Button loading={isLoading ? true : false} mode="contained" onPress={addProductApiCall}>
                    Add Product
                </Button>
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
    addProductContainer : {
        marginTop : 10,
        marginHorizontal : 15,
        marginBottom : 20
    }
})

export default AddProducts;
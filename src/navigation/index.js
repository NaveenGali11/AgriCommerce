import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favourites from "../screens/Favourites";
import Profile from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "../screens/Cart";
import { Image, Text, View } from "react-native";
import CategoryDetailsScreen from "../screens/Home/pages/CategoryDetailsScreen";
import AddProducts from "../screens/AddProducts";
import CameraScreen from "../screens/Camera";
import AdditionHelperScreen from "../screens/AdditionHelperScreen";
import Spends from "../screens/Profile/Spends";
import {Auth} from "aws-amplify";
import ChatScreen from "../screens/Chat";

const stackNavigator = createNativeStackNavigator();

const HomeNavigator = () => {
    return(
        <stackNavigator.Navigator>
            <stackNavigator.Screen name="Homescreen" component={Home} options={{
                headerShown:false
            }} />
            <stackNavigator.Screen name="Details" component={CategoryDetailsScreen} />
            <stackNavigator.Screen name="Chat" component={ChatScreen} />
        </stackNavigator.Navigator>
    )
}

const addProductsNavigator = createNativeStackNavigator();

const AddProductsNavigator = () => {
    return(
        <addProductsNavigator.Navigator>
            <addProductsNavigator.Screen name="additionHelper" component={AdditionHelperScreen} options={{headerShown:false}} />
            <addProductsNavigator.Screen name="Camera" component={CameraScreen} />
            <addProductsNavigator.Screen name="ProductsAdd" component={AddProducts} />
        </addProductsNavigator.Navigator>
    )
}

const profileNavigator = createNativeStackNavigator();

const ProfileNav = () => {
    return(
        <profileNavigator.Navigator>
            <profileNavigator.Screen name="profileHome" component={Profile} options={{headerShown : false}} />
            <profileNavigator.Screen name="spends" component={Spends} />
        </profileNavigator.Navigator>
    )
}


const TabNavigator = createBottomTabNavigator();

const Navigator = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const getCurrentUser = () => {
        Auth.currentAuthenticatedUser().then((res) => {
            console.log("Client RES :- ",res['pool']['client']);
            setName(res.username);
            if(res.attributes['custom:userType'] === "Farmer"){
                setType("Farmer")
            }else{
                setType("Customer");
            }
        },(err) => {
            console.log("ERR :- ",err);
        })
    }
    
    useEffect(() => {
        getCurrentUser();
    },[])    

    return(
        <TabNavigator.Navigator screenOptions={{
            tabBarStyle:{
                height : 60,
                borderTopRightRadius : 20,
                borderTopLeftRadius : 20,
                overflow : "hidden",
                backgroundColor : "#92745B"
            },
            tabBarLabelStyle:{
                marginBottom : 3
            },
            tabBarShowLabel : false,
            tabBarHideOnKeyboard:true,
        }}>
            <TabNavigator.Screen name="Home" component={HomeNavigator} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "home" : "home-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            },headerShown:false}} />
            {
                type === "Farmer" ? (
                    <TabNavigator.Screen name="AddProducts" component={AddProductsNavigator} options={{tabBarIcon: ({focused,size}) => {
                        return <Ionicons name={focused ? "add" : "add-outline"} color={focused ? "#7BC142" : "white"} size={size + 10} />
                    },headerShown:false}} />
                ) : (
                    <TabNavigator.Screen name="Cart" component={Cart} options={{tabBarIcon: ({focused,size}) => {
                        return <Ionicons name={focused ? "cart" : "cart-outline"} color={focused ? "#7BC142" : "white"} size={size} />
                    },headerShown:false}} />
                )
            }
            
            <TabNavigator.Screen name="Search" component={Search} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "search" : "search-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            },headerShown : false}} />
            <TabNavigator.Screen name="Favourites" component={Favourites} options={{tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "md-heart" : "md-heart-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            },headerShown : false}}/>
            <TabNavigator.Screen name="Profile" component={ProfileNav} options = {{tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "ios-person" : "ios-person-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            }, headerShown : false}} />
        </TabNavigator.Navigator>
    )
}

export default Navigator;
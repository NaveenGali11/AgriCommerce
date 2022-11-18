import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favourites from "../screens/Favourites";
import Profile from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "../screens/Cart";
import { Text, View } from "react-native";

const TabNavigator = createBottomTabNavigator();

const Navigator = () => {
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
            tabBarShowLabel : false
        }}>
            <TabNavigator.Screen name="Home" component={Home} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "home" : "home-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            },headerShown:false}} />
            <TabNavigator.Screen name="Cart" component={Cart} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "cart" : "cart-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            }}} />
            <TabNavigator.Screen name="Search" component={Search} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "search" : "search-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            }}} />
            <TabNavigator.Screen name="Favourites" component={Favourites} options={{tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "md-heart" : "md-heart-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            },headerShown : false}}/>
            <TabNavigator.Screen name="Profile" component={Profile} options = {{tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "ios-person" : "ios-person-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            }, headerShown : false}} />
        </TabNavigator.Navigator>
    )
}

export default Navigator;
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MyBookings from "../screens/MyBookings";
import Search from "../screens/Search";
import Favourites from "../screens/Favourites";
import Profile from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
            }}} />
            <TabNavigator.Screen name="MyBookings" component={MyBookings} options={{tabBarIcon: ({focused,size}) => {
                return <MaterialCommunityIcon name={focused ? "package-variant" : "package-variant-closed"} color={focused ? "#7BC142" : "white"} size={size + 6} />
            }}} />
            <TabNavigator.Screen name="Search" component={Search} options={{tabBarIcon: ({focused,size}) => {
                return <Ionicons name={focused ? "search" : "search-outline"} color={focused ? "#7BC142" : "white"} size={size} />
            }}} />
            <TabNavigator.Screen name="Favourites" component={Favourites} options={{
                tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "md-heart" : "md-heart-outline"} color={focused ? "#7BC142" : "white"} size={size} />
                }
            }}/>
            <TabNavigator.Screen name="Profile" component={Profile} options = {{
                tabBarIcon:({focused,size}) => {
                    return <Ionicons name={focused ? "ios-person" : "ios-person-outline"} color={focused ? "#7BC142" : "white"} size={size} />
                }
            }} />
        </TabNavigator.Navigator>
    )
}

export default Navigator;
import React from "react";
import { StyleSheet, Text, View,Image, ScrollView } from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Profile = () => {
    return(
        <ScrollView style={styles.rootContainer}>
            <View style={{
                alignItems : "center",
                marginTop : 10
            }}>
                <View style={styles.imageView}>
                    <Image source={{uri : "https://i.ibb.co/Jm2xM0b/arImage.png"}} style={{width : 130,height : 130}} />
                </View>
                <Text>Naveen</Text>
                <Text>naveengali80@gmail.com</Text>
            </View>
                
            <View style={styles.featuredCardsContainer}>
                <View style={styles.featureCard}>
                    <View style={styles.cardData}>
                        <Icon name="package-variant-closed" size={30} color="black" />
                        <Text>My Orders</Text>
                    </View>
                </View>
                <View style={styles.featureCard}>
                    <View style={styles.cardData}>
                        <Icon name="credit-card" size={30} color="black" />
                        <Text>Payments</Text>
                    </View>
                </View>
                <View style={styles.featureCard}>
                    <View style={styles.cardData}>
                        <Icon name="brightness-percent" size={30} color="black" />
                        <Text>My Offers</Text>
                    </View>
                </View>
            </View>
            <View >
                <List.Section>
                    <List.Subheader style={{
                        color : "black"
                    }}>
                        Information
                    </List.Subheader>
                    <List.Item title="Notifications" description="Access all your notifications from here." left={() => <List.Icon icon="bell" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}   />
                    <List.Item title="Total Spends and Savings" description="Find your total spends and savings" left={() => <List.Icon icon="cash" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}   />
                    <List.Item title="Address Book" description="Your location book" left={() => <List.Icon icon="map-marker" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}   />
                    <List.Item title="Gift Cards" description="Place to redeem your gift cards" left={() => <List.Icon icon="gift" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}   />
                </List.Section>
                <List.Section>
                    <List.Subheader style={{
                        color : "black"
                    }}>
                        More
                    </List.Subheader>
                    <List.Item title="About" description="About Us" left={() => <List.Icon icon="information" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}  />
                    <List.Item title="Help" description="Contact Us for Help in App" left={() => <List.Icon icon="account-question" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }}   />
                    <List.Item title="LogOut" left={() => <List.Icon icon="exit-to-app" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} />
                </List.Section>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex : 1,
        backgroundColor : "#ffffff"
    },
    imageView : {
        width : 130,
        height : 130,
        borderRadius : 130/2,
        overflow : "hidden",
        elevation : 5
    },
    profileContainer : {
     flex : 1,
     alignItems : "center",
     marginTop : 15
    },
    featuredCardsContainer : {
        flexDirection : "row",
        justifyContent : "space-around",
        marginTop : 30,
    },
    featureCard : {
        elevation: 10, 
        backgroundColor: '#ffffff', 
        borderRadius: 15,
        padding : 20
    },
    cardData : {
        flexDirection : "column",
        alignItems : "center"
    }
    
})

export default Profile;
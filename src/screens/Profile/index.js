import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,Image, ScrollView, Alert, Pressable } from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Auth,Storage } from "aws-amplify";
import ImagePicker from "react-native-image-crop-picker";

const Profile = (props) => {
    const [name, setName] = useState("");
    const [data, setData] = useState({});
    const [profileImage, setProfileImage] = useState("");

    const getCurrentUser = () => {
        Auth.currentAuthenticatedUser().then((res) => {
            console.log("current user RES :- ",res);
            setName(res.username);
            setData(res.attributes);
            if(res.attributes['custom:profilePicture']){
                getImageFromStorage(res.attributes['custom:profilePicture']);
            }else{
                setProfileImage("https://i.ibb.co/Jm2xM0b/arImage.png");
            }
            // setProfileImage(res.attributes['custom:profilePicture'])

        },(err) => {
            console.log("ERR :- ");
        })
    }

    const updateProfilePicture = async (imageName) => {
        console.log("In Fn");
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user,{
            "custom:profilePicture": imageName
        }).then((res) => {
            console.log("Update User Profile Picture Response :- ",res);
            getCurrentUser();
        },(err) => {
            console.log("ERRor :- ",err);
        })
    }

    const getImageFromStorage = async (image) => {
        await Storage.get(image).then((res) => {
            console.log("Image RES :- ",res);
            setProfileImage(res);
        },(err) => {
            console.log("Image ERR :- ",err);
        })
    }


    const uploadImageToStorage = async (imagePath) => {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        await Storage.put(name+'.jpg',blob,{
            contentType: 'image/jpeg' // contentType is optional
        }).then((res) => {
            console.log("Upload to Storage :- ",res);
            updateProfilePicture(res.key);
        },(err) => {
            console.log("Upload to Storage Error :- ",err);
        })
    }

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 130,
            height : 130,
            cropping: true,
            cropperCircleOverlay: true,
        }).then((res) => {
            console.log("RESS :- ",res.path);
            uploadImageToStorage(res.path);
        },(err) => {
            console.log("ERRR :- ",err);
        })
    }

    useEffect(() => {
        getCurrentUser()
    },[])

    const signOut = async () => {
        try {
            await Auth.signOut();
        }catch(error){
            Alert.alert("Error","Can't Sign you out at this moment!? Try Again Later");
        }
    }

    return(
        <ScrollView style={styles.rootContainer}>
            <View style={{
                alignItems : "center",
                marginTop : 10
            }}>
                <Pressable style={styles.imageView} onPress={() => pickImage()}>
                    <Image source={{uri : profileImage !== "" ? profileImage : "https://i.ibb.co/Jm2xM0b/arImage.png"}} style={{width : 130,height : 130}} />
                </Pressable>
                <Text>{name}</Text>
                <Text>{data.email}</Text>
            </View>
                
            <View style={styles.featuredCardsContainer}>
                <View style={styles.featureCard}>
                    <Pressable style={styles.cardData} onPress={() => getImageFromStorage()}>
                        <Icon name="package-variant-closed" size={30} color="black" />
                        <Text>My Orders</Text>
                    </Pressable>
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
                    }} onPress={updateProfilePicture}  />
                    <List.Item title="Total Spends and Savings" description="Find your total spends and savings" left={() => <List.Icon icon="cash" />} style={{marginHorizontal : 10}} titleStyle={{
                        fontSize : 20,
                        fontWeight : "bold"
                    }} descriptionStyle={{
                        color : "grey"
                    }} onPress={() => props.navigation.navigate("spends")} />
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
                    }} onPress={signOut} />
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
    },
    roundedProfileImage: {
        width:100, height:100, borderWidth:3,
        borderColor:'white', borderRadius:50
      }
})

export default Profile;
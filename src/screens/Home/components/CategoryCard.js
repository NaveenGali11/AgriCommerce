import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import {Storage} from "aws-amplify";

const CategoryCard = (props) => {
    const [imageUrl, setImageUrl] = useState("");

    const getImageFromS3 = async () => {
        await Storage.get(props.image).then((res) => {
            setImageUrl(res);
        },(err) => {
            setImageUrl("https://via.placeholder.com/100x100.png?text=No Image Found")
        })
    }

    useEffect(() => {
        getImageFromS3();
    },[])

    return (
        <Card style={styles.rootCard} onPress={() => props.navigation.navigate("Details",{
            name : props.title,
            id: props.id
        })}>
            <Card.Content style={styles.categoryView}>
                <View style={{
                    alignItems : "center"
                }}>
                    <Image source={{uri : imageUrl === "" ? "https://via.placeholder.com/100x100.png?text=Loading..." : imageUrl}} style={{width : 100,height : 100}} />
                </View>
                <View>
                    <Text style={styles.categoryName}>{props.title}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    rootCard : {
        marginHorizontal : 7,
        height : 240,
        marginBottom : 15
    },
    categoryName : {
        marginTop : 50,
        textAlign : "center",
        transform:[{ rotate: '90deg'}],
        fontSize : 20
    },
    
})

export default CategoryCard;
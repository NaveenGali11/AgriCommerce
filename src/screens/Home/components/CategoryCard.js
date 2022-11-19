import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";

const CategoryCard = (props) => {
    return (
        <Card style={styles.rootCard} onPress={() => props.navigation.navigate("Details",{
            id : props.title
        })}>
            <Card.Content style={styles.categoryView}>
                <View style={{
                    alignItems : "center"
                }}>
                    <Image source={{uri : props.image}} style={{width : 100,height : 100}} />
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
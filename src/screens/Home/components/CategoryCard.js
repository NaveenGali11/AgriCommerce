import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-paper";

const CategoryCard = (props) => {
    return (
        <View>
            <Image source={{uri : props.image}} style={{width : 100,height : 100}} />
            <Text>{props.title}</Text>
        </View>
    )
}

export default CategoryCard;
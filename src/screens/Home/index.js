import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import categories from "../../data/categories.json";

const Home = () => {
    return(
        <ScrollView horizontal>
            {
                categories.map((c) => (
                    <View key={c.id} style={{
                        marginHorizontal : 10
                    }}>
                        <Image source={{uri : c.image}} style={{
                            width : 120,
                            height : 120,
                        }} />
                    </View>
                ))
            }
            <Text>
                Home Page
            </Text>
        </ScrollView>
    )
}

export default Home;
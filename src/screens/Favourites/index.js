import React from "react";
import { ScrollView, Text, View,Image, StyleSheet, FlatList, VirtualizedList } from "react-native";
import favourites from "../../data/favourites.json";
import FavouritesCard from "./components/FavouritesCard";

const Favourites = () => {
    return(
        <FlatList
            data={favourites}
            renderItem={({item}) => (
                <FavouritesCard title={item.name} price={item.price} image={item.photo_url} category={item.category} />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <View style={styles.headerTitleView}>
                    <Text style={styles.headerText}>Favourites</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    headerTitleView : {
        marginVertical : 20,
        flex : 1,
        alignItems : "center"
    },
    headerText : {
        fontWeight : "bold",
        fontSize : 30,
        color : "#72A02A"
    }
})

export default Favourites;
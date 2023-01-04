import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import categories from "../../../data/categories.json";
import CategoryCard from "./CategoryCard";

const CategoryRow = (props) => {
    return(
        <View style={styles.rootView}>
            <FlatList
                data={props.categories}
                renderItem={({item}) => <CategoryCard id={item.id} image={item.image} title={item.name} navigation={props.navigation}  />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootView : {
        marginVertical : 10,
    }
})

export default CategoryRow;
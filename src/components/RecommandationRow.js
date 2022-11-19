import React from "react";
import { FlatList, Text, View } from "react-native";
import categories from "../data/categories.json";
import SuggestionCard from "./SuggestionCard";
import suggestedProducts from "../data/suggestions.json";

const RecommandationRow = () => {
    return (
        <FlatList
            data={suggestedProducts}
            renderItem={({item}) => <SuggestionCard title={item.name} image={item.image} price={item.price} />}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default RecommandationRow;
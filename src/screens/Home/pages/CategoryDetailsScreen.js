import React, { useEffect } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import fruits from "../../../data/fruits.json";
import exotic from "../../../data/exotic.json";
import flowers from "../../../data/flowers.json";
import leafyVegetables from "../../../data/leafyVegetables.json";
import seasonal from "../../../data/sesonal.json";
import vegetables from "../../../data/vegetables.json";
import favourites from "../../../data/favourites.json";
import ProductCard from "./components/ProductCard";

const CategoryDetailsScreen = ({navigation,route}) => {
    const {id} = route.params;
    const width = Dimensions.get('window').width;

    useEffect(() => {
        navigation.setOptions({
            title : id,
        })
    },[id])

    const getData = () => {
        let data;
        switch(id){
            case "Friuts":
                data = fruits;
                break;
            case "Vegies":
                data = vegetables;
                break;
            case "Leafys":
                data = leafyVegetables;
                break;
            case "Seasonal":
                data = seasonal;
                break;
            case "Exotic":
                data=exotic;
                break;
            case "Flowers":
                data = flowers;
                break;
            default:
                data = favourites;
        }
        return data;
    }

    return(
        <View style={{
            marginTop : 10
        }}>
            <FlatList
                data={getData()}
                renderItem={({item}) => <ProductCard title={item.name} image={item.photo_url} price={item.price} />}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent : "space-between",
                    marginHorizontal : 10,
                }}
                ListFooterComponent={() => (
                    <View style={{
                        marginVertical : 10,
                        justifyContent : "center",
                        alignItems : "center"
                    }}>
                        <Text style={{
                            fontSize : 18,
                        }}>Stay Tuned for more Products</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default CategoryDetailsScreen;
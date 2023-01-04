import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import fruits from "../../../data/fruits.json";
import exotic from "../../../data/exotic.json";
import flowers from "../../../data/flowers.json";
import leafyVegetables from "../../../data/leafyVegetables.json";
import seasonal from "../../../data/sesonal.json";
import vegetables from "../../../data/vegetables.json";
import favourites from "../../../data/favourites.json";
import ProductCard from "./components/ProductCard";
import {API,Storage} from "aws-amplify";
import * as queries from "../../../graphql/queries";

const CategoryDetailsScreen = ({navigation,route}) => {
    const {id,name} = route.params;
    const [items, setItems] = useState([]);
    const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/100x100.png?text=No Image Found");

    const listProducts = async () => {
        await API.graphql({
            query: queries.listProducts,
            variables:{filter: {category: {eq: id}}}
        }).then((res) => {
            console.log("LIST PROducts RESponse :_ ",res.data.listProducts.items);
            setItems(res.data.listProducts.items);
        },(err) => {
            console.log("LIST Products ERROR :_ ",err);
        })
    }

    useEffect(() => {
        listProducts()
    },[]);

    useEffect(() => {
        navigation.setOptions({
            title : name,
        })
        console.log("Params :_ ",route.params);
    },[name])

    const getData = () => {
        let data;
        switch(id){
            case "Friuts":
                data = fruits;
                break;
            case "Vegetables":
                data = vegetables;
                break;
            case "Leafys":
                data = leafyVegetables;
                break;
            case "Seasonals":
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
                data={items}
                renderItem={({item}) => <ProductCard harvestedBy={item.userId} title={item.name} image={item.image} price={item.price} />}
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
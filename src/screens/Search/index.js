import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import RecommandationRow from "../../components/RecommandationRow";
import {API} from "aws-amplify";
import * as queries from "../../graphql/queries";
import ProductCard from "../Home/pages/components/ProductCard";

const Search = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async (text) => {
        let filter = {
            name : {
                contains: text
            }
        }
        await API.graphql({
            query: queries.listProducts,
            variables: {filter: filter}
        }).then((res) => {
            console.log("Search Product",res.data.listProducts.items);
            setProducts(res.data.listProducts.items);
        },(err) => {
            console.log("ERR :_ ",err);
        })
    }

    return(
        <ScrollView>
            <Text style={styles.headerText}>
                Search for farm fresh goods
            </Text>
            <View style={styles.searchBarContainer}>
                <Searchbar placeholder="Search" onChangeText={(e) => getProducts(e)} style={styles.searchBAr} />
            </View>
            <View style={styles.suggestedHeadingContainer}>
                <Text style={styles.suggestedHeading}>Search Results ({products.length})</Text>
            </View>
            <View>
                <FlatList
                    data={products}
                    renderItem={({item}) => <ProductCard harvestedBy={item.userId} title={item.name} image={item.image} price={item.price} />}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent : "space-between",
                        marginHorizontal : 10,
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText : {
        textAlign : "center",
        marginVertical : 10,
        fontSize : 22,
        color : "#416422",
        fontWeight : "bold"
    },
    searchBarContainer : {
        marginHorizontal : 10,
        marginVertical : 10,
    },
    searchBAr :{
        borderRadius : 15,
    },
    suggestedHeadingContainer : {
        marginVertical : 10,
        marginLeft : 10
    },
    suggestedHeading : {
        fontSize : 19,
        fontWeight : "bold",
        color : "#D9D40C"
    }
})

export default Search;
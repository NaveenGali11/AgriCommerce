import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import RecommandationRow from "../../components/RecommandationRow";

const Search = () => {
    return(
        <View>
            <Text style={styles.headerText}>
                Search for farm fresh goods
            </Text>
            <View style={styles.searchBarContainer}>
                <Searchbar placeholder="Search" onChangeText={(e) => console.log(e)} style={styles.searchBAr} />
            </View>
            <View style={styles.suggestedHeadingContainer}>
                <Text style={styles.suggestedHeading}>Suggestions For You</Text>
            </View>
            <View>
                <RecommandationRow />
            </View>
        </View>
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
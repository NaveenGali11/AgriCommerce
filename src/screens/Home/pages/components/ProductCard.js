import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, IconButton } from 'react-native-paper';


const ProductCard = (props) => {
    return (
       <Card style={styles.card}>
       <Card.Content>
         <Image source={{uri: props.image}} style={{width: 100, height: 100}} />
         <Text style={styles.title}>{props.title}</Text>
       </Card.Content>
       <View style={styles.priceContainer}>
         <Text style={styles.price}>₹ {props.price}</Text>
       </View>
       <View style={styles.actionRow}>
         <IconButton icon="heart-plus" size={19} mode="outlined"  containerColor="#ffffff" iconColor='red' />
         <IconButton icon="cart-plus" size={19} mode="outlined"  containerColor="#ffffff" iconColor='#7BC142' />
       </View>
     </Card>
    )
}


const styles = StyleSheet.create({
    card: {
      marginHorizontal: 10,
      marginBottom: 15,
    },
    actionBtnsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginVertical: 0,
    },
    title : {
      fontSize : 20,
      fontWeight : "900",
      flexWrap : "wrap",
      textAlign : "center"
    },
    actionRow : {
      flexDirection :"row",
      justifyContent :"space-around",
      alignItems : "center",
      marginTop : 4
    },
    price : {
      margin : 3,
      fontSize : 18,
      fontWeight : '800'
    },
    priceContainer : {
        justifyContent : "center",
        alignItems : "center"
    }
  });  

export default ProductCard;
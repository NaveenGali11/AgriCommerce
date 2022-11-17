import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Badge, Card,IconButton} from 'react-native-paper';

const FavouritesCard = props => {
  return (
    <Card style={styles.cardStyle}>
      <Card.Content style={styles.rootContainer}>
        <Image
          source={{
            uri: props.image,
          }}
          style={{width: 100, height: 100,marginRight : 20}}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{props.title}</Text>
            <Text style={styles.priceText}>$ {props.price}</Text>
          </View>
          <View style={styles.actionBtnsContainer}>
              <IconButton
                icon="cart"
                mode="contained-tonal"
                onPress={() => console.log('Pressed Add to CarT!')}
                containerColor="#92745B"
                iconColor='#ffffff'
              />
              <IconButton
                icon="heart-remove"
                mode="outlined"
                onPress={() => console.log('Pressed Add to CarT!')}
                containerColor="#ffffff"  
                iconColor='red'
              />
            </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 2,
    flexDirection: 'row',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  actionBtnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems : "flex-end",
    marginVertical : 0
  },
  categoryView: {
    paddingHorizontal: 8,
    height: 20,
    fontSize: 13,
    fontWeight : "bold",
    color : "#ffffff"
  },
  cardStyle: {
    marginHorizontal : 10,
    marginBottom : 15
  },
  priceText : {
    fontSize : 20,
    alignItems : "center",
    fontWeight : '600'
  },
  bottomSection: {
    flex : 1,
    flexDirection : "row",
    alignItems : "center"
  },
  categoryButton : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  }
});

export default FavouritesCard;

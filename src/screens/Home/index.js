import React from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import categories from '../../data/categories.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryCard from './components/CategoryCard';
import CategoryRow from './components/CategoryRow';
import RecommandationRow from '../../components/RecommandationRow';
import FabComponent from './components/FabComponent';
import { FAB } from 'react-native-paper';

const Home = (props) => {
  const width = Dimensions.get('window').width;
  const userType = "Farmer";

  return (
    <View>
            <ScrollView>
        <View style={styles.topBanner}>
          <View style={styles.locationContainer}>
            <Icon name="map-marker-outline" size={29} color="white" />
            <View>
              <Text style={styles.location}>Chennai, 600073</Text>
            </View>
          </View>
          <Pressable
            style={styles.walletComponent}
            onPress={() => console.log('Clicked WAllet')}>
            <Icon name="wallet-outline" size={30} color="white" />
            <Text style={styles.walletBalance}>40.0</Text>
          </Pressable>
        </View>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryHeading}>Categories</Text>
          <CategoryRow navigation={props.navigation} />
        </View>
        <View>
          <Text style={styles.categoryHeading}>Suggested For You</Text>
          <View style={styles.recommendationContainer}>
            <RecommandationRow />
          </View>
        </View>
        <View>
          <Text style={styles.categoryHeading}>Suggested For You</Text>
          <View style={styles.recommendationContainer}>
            <RecommandationRow />
          </View>
        </View>
        <View>
          <Text style={styles.categoryHeading}>Suggested For You</Text>
          <View style={styles.recommendationContainer}>
            <RecommandationRow />
          </View>
        </View>
    </ScrollView>
      {
          userType === "Farmer" ? <FabComponent /> : <FAB icon="account-question" style={{
            position: 'absolute', zIndex: 99, elevation: 5, width: Dimensions.get('screen').width / 7, height: Dimensions.get('screen').width / 7, backgroundColor: '#00B0EB', borderRadius: 1000, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 20, right: 20 }} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  topBanner: {
    backgroundColor: '#4AB132',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  walletComponent: {
    padding: 15,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  walletBalance: {
    fontSize: 20,
    marginLeft: 10,
  },
  locationHeading: {
    fontSize: 19,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  location: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  carouselArea: {
    height: 300,
  },
  categoriesHeaderSection: {
    marginTop: 10,
    marginLeft: 10,
  },
  categoriesHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryRow : {
    marginVertical : 10
  },
  categoryHeading : {
    marginLeft : 10,
    fontSize : 22,
    fontWeight : "bold",
    color : "#D9D40C"
  },
  recommendationContainer: {
    marginTop : 10
  }
});

export default Home;

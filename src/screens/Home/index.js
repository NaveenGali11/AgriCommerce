import React,{useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,  
  View,
} from 'react-native';
import {Button} from "react-native-paper";
import categories from '../../data/categories.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryCard from './components/CategoryCard';
import CategoryRow from './components/CategoryRow';
import RecommandationRow from '../../components/RecommandationRow';
import FabComponent from './components/FabComponent';
import { FAB, ToggleButton } from 'react-native-paper';
import {API,Auth} from "aws-amplify";
import * as queries from '../../graphql/queries';
import RBSheet from "react-native-raw-bottom-sheet";
import {CognitoIdentityCredentials, CognitoIdentityServiceProvider} from "aws-sdk"
import {GetUserRequest} from "aws-sdk/clients/cognitoidentityserviceprovider";

// https://i.ibb.co/p1hxXYc/Farmer-Image.jpg
// https://i.ibb.co/w4v67x6/Customer-Image.jpg

const Home = (props) => {
  const [categories, setCategories] = useState([]);
  const [hasType, setHasType] = useState(false);
  const [userType, setUserType] = useState("");
  const [chosenUserType, setChosenUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const width = Dimensions.get('window').width;
  // const userType = "Farmer";

  const refRBSheet = useRef();

  const getCategories = async () => {
    await API.graphql({
      query: queries.listCategories,
    }).then((res) => {
      console.log("ALL Categories REsponse :- ",res.data.listCategories.items);
      setCategories(res.data.listCategories.items);
    })
  }

  const getCurrentUser = async () => {
    await Auth.currentAuthenticatedUser().then((res) => {
      console.log("RES :- ",res);
      if(res.attributes['custom:userType']){
        setHasType(true);
        setUserType(res.attributes['custom:userType']);
      }else{
        refRBSheet.current.open();
        setHasType(false);
      }
    },(err) => {
      console.log("ERR :- ",err);
    })
  }

  const updateFucntion = async () => {
    setLoading(true);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user,{
      'custom:userType': chosenUserType,
    }).then((res) => {
      setLoading(false);
      refRBSheet.current.close();
      console.log("RES :_ ",res);
    },(err) => {
      setLoading(false);
      console.log("ERR :_ ",err);
    })
  }

  const updateUserDetails = async () => {
    console.log("IN Update!");
    Alert.alert("Are You Sure?","You Cannot change the usertype again!",[
      {
        text: "Proceed",
        onPress: () => updateFucntion()
      },
      {text: "Cancel"}
    ])
  }

  useEffect(() => {
    getCategories();
    getCurrentUser();
  },[])

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
          <CategoryRow navigation={props.navigation} categories={categories} />
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
          userType === "Farmer" ? <FabComponent chatNavigation={props.navigation} /> : <FAB icon="account-question" style={{
            position: 'absolute', zIndex: 99, elevation: 5, width: Dimensions.get('screen').width / 7, height: Dimensions.get('screen').width / 7, backgroundColor: '#00B0EB', borderRadius: 1000, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 20, right: 20 }} onPress={() => props.navigation.navigate('Chat')}  />
      }
      <RBSheet 
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        closeOnPressBack={false}
        customStyles={{
            wrapper:{
              backgroundColor:"transparent"
          },
          draggableIcon:{
              backgroundColor:"#000"
          }
        }}
        height={400}
        animationType="slide"
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetHeading}>Choose User Type</Text>
          <Text style={styles.noteText}>You Can not change the user type once chosen!</Text>
          <View style={styles.userTypeContainer}>
            <Pressable style={chosenUserType === "Farmer" ? styles.selectedUserTypeBtn : styles.userTypeBtn} onPress={() => setChosenUserType("Farmer")}>
              <Image source={{uri: "https://i.ibb.co/p1hxXYc/Farmer-Image.jpg"}} style={{width:125,height : 125}} />
              <Text style={styles.typeName}>Farmer</Text>
            </Pressable>
            <Pressable style={chosenUserType === "Customer" ? styles.selectedUserTypeBtn : styles.userTypeBtn} onPress={() => setChosenUserType("Customer")}>
              <Image source={{uri: "https://i.ibb.co/w4v67x6/Customer-Image.jpg"}} style={{width:125,height : 125}} />
              <Text style={styles.typeName}>Customer</Text>
            </Pressable>
          </View>
          <View style={styles.submitBtnContainer}>
              {
                loading ? <ActivityIndicator animating size="small" color="red" /> : (
                  <Button mode="outlined" style={styles.submitBtn} onPress={updateUserDetails} disabled={chosenUserType === "" ? true : false}>
                    Submit
                  </Button>
                )
              }
          </View>
        </View>
      </RBSheet>
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
  },
  bottomSheetHeading : {
    fontSize : 25,
    textAlign: "center",
  },
  bottomSheetContainer:{
    marginTop : 20
  },
  noteText : {
    fontSize : 15,
    textAlign : "center"
  },
  userTypeContainer: {
    flexDirection : "row",
    justifyContent : "space-around",
    marginTop : 20
  },
  typeName : {
    fontSize : 20,
    textAlign : "center"
  },
  submitBtnContainer : {
    marginTop: 20,
    marginHorizontal : 10
  },
  userTypeBtn : {
    elevation : 5,
    padding : 19,
    borderRadius : 10,
    shadowRadius: 10,
  },
  selectedUserTypeBtn : {
    elevation : 5,
    padding : 19,
    borderRadius : 10,
    shadowRadius: 10,
    shadowColor : "red"
  }
});

export default Home;

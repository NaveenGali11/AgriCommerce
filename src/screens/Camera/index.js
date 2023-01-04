import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {RadioButton,ActivityIndicator, Button} from "react-native-paper";
import {RNCamera} from "react-native-camera";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";

const CameraScreen = ({navigation,route}) => {
    const [identifiedAs, setIdentifiedAs] = useState("");
    const [objects, setObjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState("");

    const refRBSheet = useRef();

    const identifyImage = (imageData) => {
        setIsLoading(true);
        const USER_ID = 'yagqm9r7nnrn';
        const PAT = 'ed9100640015429da5e519cac4568aa3';
        const APP_ID = 'agriEcommerce';
        const MODEL_ID = 'food-item-recognition';
        const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';
        const BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

        const raw = JSON.stringify({
            "user_app_id":{
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs":[
                {
                    "data":{
                        "image":{
                            "base64": imageData
                        }
                    }
                }
            ]
        })

        const requestOptions = {
            method : "POST",
            headers: {
                'Accept':'application/json',
                'Authorization':'Key '+PAT
            },
            body:raw
        }
        axios.post("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs?sortAscending=true",raw,{
            headers:{
                'Accept':'application/json',
                'Authorization':'Key '+PAT
            }
        }).then((res) => {
            setObjects(res.data.outputs[0].data.concepts);
            setIsLoading(false);
            refRBSheet.current.open();
            console.log("RES:-",res.data.outputs[0].data.concepts);
        },(err) => {
            setIsLoading(false);
            console.log("ERR :- ",err)
        })
    }

    useEffect(() => {
        console.log("Current Length of objects :- ",objects.length);
    },[objects])

    const takePicture = async function(camera){
        const options = {quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        identifyImage(data.base64);
        setIdentifiedAs(data.base64);
    }

    const PendingView = () => (
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Waiting</Text>
        </View>
    );

    return (
        <View>
            <RNCamera
                style={{
                    width:"100%",
                    height:"100%"
                }}
                type="back"
                flashMode="auto"
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                captureAudio={false}
            >
                {({ camera, status }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                    <View style={{ flex: 1, justifyContent: 'flex-end',alignItems:'flex-end',height : '100%'}}>
                        <TouchableOpacity onPress={() => {
                            takePicture(camera);
                        }} style={styles.capture} disabled={isLoading ? true : false}>
                            {
                                isLoading ? <ActivityIndicator size="small" /> : <Text style={{ fontSize: 14 }}> CAPTURE </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    );
                }}
            </RNCamera>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper:{
                        backgroundColor:"transparent"
                    },
                    draggableIcon:{
                        backgroundColor:"#000"
                    }
                }}
                height={360}
                animationType="slide"
            >
                <ScrollView>
                    <Text style={styles.bottomSheetHeader}>Choose a product to proceed further</Text>
                    <Text style={{
                        textAlign: "center",
                        fontSize : 12
                    }}>Values might be wrong please try adding manually.</Text>
                    <View>
                        {
                            objects.slice(0,4).map((i) => (
                                <View style={styles.radioContainer}>
                                    <Text>{i.name}</Text>
                                    <RadioButton
                                        value={i.name}
                                        status={checked === i.name ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(i.name)}
                                        key={i.id}
                                    />
                                </View>
                            ))
                        }
                    </View>
                    <View style={{
                        marginTop : 10,
                        marginHorizontal: 10
                    }}>
                        <Button mode="outlined" onPress={() => {
                            console.log("Identified Image :- ",checked);
                            refRBSheet.current.close();
                            navigation.navigate('ProductsAdd',{
                                name : checked,
                                type : route.params.type,
                                mode: route.params.mode
                            })
                        }}>
                            Proceed
                        </Button>
                    </View>
                </ScrollView>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    bottomSheetHeader: {
        textAlign : "center",
        fontSize : 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        minHeight: 48,
        paddingStart: 8,
        paddingEnd: 8,
        borderRadius: 4,
        marginBottom: 4
    },
})

export default CameraScreen;

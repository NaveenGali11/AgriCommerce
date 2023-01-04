import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

const ChatInput = (props) => {
    return(
        <View style={styles.container}>
            <TextInput
                placeholder="Start Typing..."
                mode="outlined"
                style={styles.input}
                onChangeText={(text) => props.onTextChange(text)}
                value={props.message}
            />
            <IconButton icon="navigation-variant" iconColor="white" size={27} containerColor="black" onPress={props.btnClick} />
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        bottom: 0
    },
    input: {
        width : "85%"
    }
})

export default ChatInput;
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import ChatInput from "./components/ChatInput";
import {Auth,API} from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import * as queries from "../../graphql/queries";
import {Chat,MessageType} from "@flyerhq/react-native-chat-ui";
import {SafeAreaProvider} from "react-native-safe-area-context";

const ChatScreen = () => {
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const getCurrentUser = async () => {
        await Auth.currentAuthenticatedUser().then((res) => {
            setUsername(res.username);
        },(err) => {
            console.log("ERR: - ",err);
        })
    }

    const getMessages = async () => {
        await API.graphql({
            query: queries.listMessages
        }).then((res) => {
            console.log("RES :- ",res.data.listMessages.items);
            setMessages(res.data.listMessages.items);
        },(err) => {
            console.log("ERR :- ",err);
        })
    }

    useEffect(() => {
        getCurrentUser();
        getMessages();
    },[])


    const addMessage = async () => {
        const messageData = {
            "username":username,
            "message":message
        }
        console.log("In add message");
        await API.graphql({
            query : mutations.createMessage,
            variables: {input : messageData}
        }).then((res) => {
            console.log("RES of CM :- ",res);
            getMessages();
            setMessage("");
        },(err) => console.log("ERR :- ",err))
    }

    let user = {
        "id":username
    }

    return(
        <SafeAreaProvider>
            <Chat 
                messages={messages}
                onSendPress={(e) => console.log("MSG :- ",e)}
                user={user}
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    rootView : {
        flex : 1,
        height: "100%",
        flexDirection : "column",
        justifyContent : "space-between"
    },
    inputContainer : {
        marginVertical : 10,
        marginHorizontal : 10
    },
    chatMessage:{
        fontSize : 30,
    },
    chatMessageContainer : {
        borderWidth : 1,
        alignItems:"flex-start"
    },
    chatMessageFromMe : {
        borderWidth : 2,
        alignItems:"flex-end"
    }
})

export default ChatScreen;
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";

const FabComponent = () => {
    const [state, setState] = useState({open : false});
    const onStateChange = ({open}) =>  setState({open});
    const {open} = state;

    return(
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'window-close' : 'plus'}
                    actions={[
                        {
                          icon: 'plus',
                          label: 'Add Product',
                          onPress: () => console.log('Pressed Add Product'),
                        },
                        {
                          icon: 'phone',
                          label: 'Contact Support',
                          onPress: () => console.log('Pressed Support'),
                        },
                        {
                          icon: 'account-group',
                          label: 'Community',
                          onPress: () => console.log('Pressed Community'),
                        },
                      ]}
                      onStateChange={onStateChange}
                      onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                            console.log("It is Open!");
                        }
                      }}
                      
                />
            </Portal>
        </Provider>
    )
}

export default FabComponent;
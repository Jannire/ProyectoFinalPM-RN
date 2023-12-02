import React, { useEffect, useState } from 'react';
import { AlertDialog, Icon, ShareIcon, Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
import { StyleSheet, Linking } from 'react-native'
import { Flex, Spacer, Input, VStack } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Path } from "react-native-svg";

import HomeScreen from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();

const BottomBar = ({ navigation }) => {
    useEffect(() => { });
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const initiateWhatsApp = () => {
        let url =
          'whatsapp://send?text=' + 
           "Hola! Puedes revisar nuestro proyecto en el siguiente link: https://github.com/Jannire/PM-Entrega01Grupal" +
          '&phone=51' + "955198135";
        Linking.openURL(url)
          .then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
    };

    return (
        <View>
            <HStack bg="orange.400" h="30%">
                <Center h="100%" w="33%">
                    <Button  variant="ghost" w="100%" h="100%" onPress={() => navigation.navigate("Home")}>
                        <Icon style={styles.tabs} marginLeft="2.5" viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        <Text style={styles.tabs} marginBottom="3">Home</Text> 
                    </Button>
                </Center>
                <Center w="33%">
                    <Button variant="ghost" w="100%" h="100%" onPress={() => navigation.navigate("Ejercicios")}>
                        <Icon style={styles.tabs} marginLeft="5" viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        <Text style={styles.tabs} marginBottom="3">Ejercicios</Text> 
                    </Button>
                </Center>
                <Center w="33%">
                    <Button variant="ghost" w="100%" h="100%" onPress={() => setIsOpen(!isOpen)}>
                        <ShareIcon style={styles.tabs} marginLeft="5"/>
                        <Text style={styles.tabs} marginBottom="3">Compartir</Text> 
                    </Button>
                </Center>
            </HStack>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    
                    <AlertDialog.Header>Compartir App</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Button>
                            aaa
                        </Button>
                        Compartir
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button colorScheme="warning" onPress={onClose}>
                                Aceptar
                            </Button>
                            <Button colorScheme="warning" onPress={initiateWhatsApp}>
                                WH
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

        </View>

    );
};

const styles = StyleSheet.create({
    tabs: {
        color: '#FFFFFF',
        alignItems: "center"
    },

});


export default BottomBar;
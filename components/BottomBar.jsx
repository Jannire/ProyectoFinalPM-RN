import React, { useEffect, useState } from 'react';
import { AlertDialog, Icon, ShareIcon, Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
import { StyleSheet } from 'react-native'
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


    return (
        <View>
            <HStack bg="orange.300" h="30%">
                <Center h="100%" w="33%">
                    <Button variant="ghost" w="100%" h="100%" onPress={() => navigation.navigate("Home")}>
                        <Icon viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        Home
                    </Button>
                </Center>
                <Center w="33%">
                    <Button variant="ghost" w="100%" h="100%" onPress={() => navigation.navigate("Rutina")}>
                        <Icon viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        Rutina
                    </Button>
                </Center>
                <Center w="33%">
                    <Button variant="ghost" w="100%" h="100%" onPress={() => setIsOpen(!isOpen)}>
                        <ShareIcon />
                        Compartir
                    </Button>
                </Center>
            </HStack>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    
                    <AlertDialog.Header>Compartir App</AlertDialog.Header>
                    <AlertDialog.Body>
                        Compartir
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button colorScheme="warning" onPress={onClose}>
                                Aceptar
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

        </View>

    );
};


export default BottomBar;
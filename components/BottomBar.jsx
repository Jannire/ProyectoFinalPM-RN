import React, { useEffect, useState } from 'react';
import { AlertDialog, Icon, ShareIcon, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
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

    const AbrirWhatsapp = () => { // CAMBIAR PARA ESCOGER A QUIEN MANDAR
        let url =
            'whatsapp://send?text=' +
            "Hola! Puedes revisar nuestro proyecto en el siguiente link: https://github.com/Jannire/ProyectoFinalPM-RN" +
            '&phone=51' + "955198135";
        Linking.openURL(url)
            .then((data) => {
                console.log('AbrirWhatsapp: Mandar mensaje');
            })
            .catch(() => {
                alert('Hay un error: Whatsapp Compartir');
            });
    };

    const AbrirGithub = () => {
        let url = 'https://github.com/Jannire/ProyectoFinalPM-RN';
        Linking.openURL(url)
            .then((data) => {
                console.log('AbrirGithub: Abrir repo en Github');
            })
            .catch(() => {
                alert('Hay un error: Github Compartir');
            });
    };

    return (
        <View>
            <HStack bg="orange.400" h="33%">
                <Center w="33%" style={styles.buttons}>
                    <Button variant="ghost" w="100%" onPress={() => navigation.navigate("Home")}>
                        <Icon style={styles.tabs} marginLeft="2.5" viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        <Text style={styles.tabs} marginBottom="3">Home</Text>
                    </Button>
                </Center>
                <Center w="33%"  style={styles.buttons}>
                    <Button variant="ghost" w="100%" onPress={() => navigation.navigate("Ejercicios")}>
                        <Icon style={styles.tabs} marginLeft="5" viewBox="0 0 24 24"><Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></Icon>
                        <Text style={styles.tabs} marginBottom="3">Ejercicios</Text>
                    </Button>
                </Center>
                <Center w="33%"  style={styles.buttons}>
                    <Button variant="ghost" w="100%" onPress={() => setIsOpen(!isOpen)}>
                        <ShareIcon style={styles.tabs} marginLeft="5" />
                        <Text style={styles.tabs} marginBottom="3">Compartir</Text>
                    </Button>
                </Center>
            </HStack>

            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>

                    <AlertDialog.Header>Compartir App</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Center>
                        <HStack space={2}>
                            <Center>
                                <Button variant="unstyled" onPress={AbrirWhatsapp}>
                                    <Image source={{
                                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Whatsapp_logo_svg.png/600px-Whatsapp_logo_svg.png"
                                    }} alt="Logo Whatsapp" size="sm" />
                                </Button>
                            </Center>
                            <Center>
                                <Button variant="unstyled" onPress={AbrirGithub}>
                                    <Image source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    }} alt="Logo Github" size="sm" />
                                </Button>
                            </Center>
                        </HStack>
                        </Center>
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

const styles = StyleSheet.create({
    tabs: {
        color: '#FFFFFF',
        alignItems: "center"
    },
    buttons: {
        justifyContent: 'flex-start'
    }

});


export default BottomBar;
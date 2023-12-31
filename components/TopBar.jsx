import React, { useEffect, useState } from 'react';
import { Pressable, Menu, AlertDialog, Icon, HamburgerIcon, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
import { StyleSheet, Linking } from 'react-native'
import { Flex, Spacer, Input, VStack } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";
import { Path } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';

function More({ navigation }) {
    useEffect(() => { });
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [about, setAbout] = React.useState([]);

    const cerrarSesion = async () => {
        await AsyncStorage.removeItem('member_id');
        await AsyncStorage.removeItem('user_id');
        console.log("Sesión cerrada!");
        navigation.navigate("Login")
    }

    useEffect(() => {
        obtenerAbout();
    }, [])


    const obtenerAbout = async () => {
        try {
            const ruta = `${RUTA_BACKEND}/about`;
            const response = await fetch(ruta);
            const resp = await response;
            const data = await resp.json();
            setAbout(data);
            console.log(about);
        } catch (error) {
            console.log(error);
            console.log("Error: -" + error);
        } finally {
            console.log("Finally: Llamada obtener About");
        }
    };


    return <View>
        <Menu w="190" marginRight="4" trigger={triggerProps => {
            return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon size="5" marginRight="4" style={styles.tabs} />
            </Pressable>;
        }}>
            <Menu.Item onPress={() => navigation.navigate("Profile")}>Editar Perfil</Menu.Item>
            <Menu.Item onPress={() => setIsOpen(!isOpen)}>Acerca de</Menu.Item>
            <Menu.Item onPress={() => cerrarSesion()}>Cerrar Sesión</Menu.Item>
        </Menu>

        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header>Miembros del equipo</AlertDialog.Header>
                <AlertDialog.Body>
                    {
                        about.map((miembro) => { 
                            return <Text> {miembro.codigo}:  {miembro.nombre}</Text>
                        })
                    }
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group>
                        <Button colorScheme="warning" onPress={onClose}>
                            Aceptar
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </View>
}

const TopBar = ({ navigation }) => {

    return (
        <View>
            <HStack space={2} bg="orange.400" h="40px" justifyContent="space-between">
                <Center marginLeft="4">
                    <Text style={styles.tabs} >Gimnasio Ulima</Text>
                </Center>
                <Center>
                    <More navigation={navigation} />
                </Center>
            </HStack>
        </View>

    );
};

const styles = StyleSheet.create({
    tabs: {
        color: '#FFFFFF',
        alignItems: "center",
        fontWeight: "bold"
    },
});


export default TopBar;
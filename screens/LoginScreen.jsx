import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Input, VStack, Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
import { StyleSheet } from 'react-native';
import { RUTA_BACKEND } from "../ruta_back.js";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const mandarCredenciales = async (user = null, password = null) => {
    try {
        if (user == null && password == null) {
            console.log("Ingresar credenciales");
            alert("Ingresar creds");
        }
        else {
            const data = {
                user: user,
                password: password
            }
            const ruta = `${RUTA_BACKEND}/user/validate`;
            const resp = await fetch(ruta, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const dataResp = await resp.json();
            console.log("RESP: ");
            console.log(dataResp);
            return dataResp;
        }
    } catch (error) {
        console.error(error);
        console.log("Error: -" + error);
    } finally {
        console.log("Finally: Llamada user");
    }
};



const LoginScreen = ({ navigation }) => {
    const isFocused = useIsFocused();

    const obtenerDataUser = async () => {
        try {
            const userID_check = await AsyncStorage.getItem('user_id');
            console.log("userID");
            console.log(userID_check);
            if (userID_check != null) {
                navigation.navigate("Home");
            }
        }
        catch (error) {
            console.log("Login usual");
        }
    }

    useEffect(() => {
        if (isFocused) {
            obtenerDataUser();
        }
    }, [isFocused])

    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleChangeUser = text1 => setUser(text1);
    const handleChangePassword = text2 => setPassword(text2);

    const CheckUser = async () => {
        const check = await mandarCredenciales(user, password);
        if (check.success) {
            const data = check.data;
            const memberID = JSON.parse(data).member_id;
            const userID = JSON.parse(data).user_id;
            await AsyncStorage.setItem('member_id', memberID.toString());
            await AsyncStorage.setItem('user_id', userID.toString());
            navigation.navigate("Home");
        }
        else {
            alert("MAL USER"); // Hacer más bonis
        }
    }
    //
    return (
        <View >
            <VStack space={2} alignItems="center">
                <Center w="64" h="150" rounded="md" marginY={50}>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Universidad_de_Lima_logo.png" }}
                        alt="Alternate Text" size="xl" />
                    <Text bold paddingY={3}> Gimnasio ULima </Text>
                </Center>
                <Center w="100%" h="100%" bg="orange.500" shadow={3} >
                    <HStack space={3} justifyContent="center">
                        <Center h="40" w="15" rounded="md" paddingX={100} />
                        <Center w="270" rounded="md" bg="aliceblue" marginBottom="910" paddingY={35} paddingX={5}>
                            <Heading marginTop={5} size="sm" ml="-1" textAlign="center"> Ingresa tu información de usuario </Heading>
                            <Input value={user} onChangeText={handleChangeUser} size="xs" marginTop={5} variant="rounded" placeholder="Usuario" w="100%" />
                            <Input value={password} onChangeText={handleChangePassword} size="xs" marginTop={3} variant="rounded" placeholder="Contraseña" w="100%" type={"password"} />
                            <Button
                                w="70%"
                                marginY={5}
                                onPress={() => CheckUser()}>
                                Acceder
                            </Button>
                        </Center>
                        <Center h="40" w="20" rounded="md" />
                    </HStack>;
                </Center>
            </VStack>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
    },
    box: {
        backgroundColor: "aliceblue",
        padding: 15
    },
    box1: {
        backgroundColor: "red",
        padding: 15
    }

});
export default LoginScreen;
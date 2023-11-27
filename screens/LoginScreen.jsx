import React, { useEffect, useState } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, View, Button } from "native-base";
import { StyleSheet } from 'react-native'

import { Flex, Spacer, Input, VStack } from "native-base";
//import { BASE_URL } from '../configs/constants';

const LoginScreen = ({ navigation }) => {
    useEffect(() => { });

    return (
        <View >
            <VStack space={2} alignItems="center">
                <Center w="64" h="150" rounded="md" marginY={50}>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Universidad_de_Lima_logo.png"}} 
                        alt="Alternate Text" size="xl" />
                    <Text bold paddingY={3}> Gimnasio ULima </Text>
                </Center>
                <Center w="100%" h="100%" bg="orange.500" shadow={3} >
                    <HStack space={3} justifyContent="center">
                        <Center h="40" w="15" rounded="md" paddingX={100} />
                        <Center w="270" rounded="md" bg="aliceblue" marginBottom="910" paddingY={35} paddingX={5}>
                            <Heading marginTop={5} size="sm" ml="-1" textAlign="center"> Ingresa tu información de usuario </Heading>
                            <Input size="xs" marginTop={5} variant="rounded" placeholder="Usuario" w="100%" />
                            <Input size="xs" marginTop={3} variant="rounded" placeholder="Contraseña" w="100%" type={"password"} />
                            <Button
                                w="70%"
                                marginY={5}
                                onPress={() => navigation.navigate('Home')}>
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
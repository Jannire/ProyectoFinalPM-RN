import { View, Image, Icon, Center, HStack, Select, ArrowBackIcon, Pressable, Button, VStack } from "native-base";
import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Path } from "react-native-svg";

import { RUTA_BACKEND } from "../ruta_back.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [User, setUser] = useState([]);

  const obtenerPerfil = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const ruta = `${RUTA_BACKEND}/member/profile?user_id=${user_id}`;
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json()
      setUser(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Llamada user")
    }
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('member_id');
    await AsyncStorage.removeItem('user_id');
    console.log("Sesión cerrada!");
    navigation.navigate("Login")
}

  useEffect(() => {
    obtenerPerfil()
  }, [])

  return (
    <View>

      <HStack space={2} h="6.5%" justifyContent="space-between">
        <Center marginLeft={1}>
          <Button variant="ghost" colorScheme="orange" onPress={() => navigation.goBack()}>
            <ArrowBackIcon />
          </Button>
        </Center>
        <Center marginRight={1}>
          <Button variant="ghost" colorScheme="orange">
            <Icon size="5" viewBox="0 0 24 24"><Path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></Icon>
          </Button>
        </Center>
      </HStack>

      <HStack space={2} marginTop={6} paddingX={5}>
        <Center marginLeft={5}> 
          <Image source={{
            uri: RUTA_BACKEND + "/" + User.image_url
          }} alt={User.names} borderRadius={100} w="100" h="100" />
        </Center>
        <Center>
          <VStack w={"90%"}>
            <Center style={{ alignItems: "flex-start" }}>
              <Text style={styles.noms} >{User.last_names} {User.names} </Text>
            </Center>
            <Center style={{ alignItems: "flex-start" }}>
              <HStack>
                <Center>
                  <Icon size="5" viewBox="0 0 24 24"><Path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></Icon>
                </Center>
                <Center marginLeft={2}>
                  <Text>{User.user}</Text>
                </Center>
              </HStack>
            </Center>
          </VStack>
        </Center>
      </HStack>

      <VStack  alignSelf={"center"} marginTop={5}>
        <HStack>
          <Center>
            <Icon size="5" viewBox="0 0 24 24"><Path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></Icon>
          </Center>
          <Center marginLeft={2}>
            <Text>{User.phone}</Text>
          </Center>
        </HStack>

        <HStack>
          <Center>
            <Icon size="5" viewBox="0 0 22 22"><Path d="M1 5H2V4H20V5H21V18H20V19H2V18H1V5M3 17H19V9H18V10H16V11H14V12H12V13H10V12H8V11H6V10H4V9H3V17M19 6H3V7H5V8H7V9H9V10H13V9H15V8H17V7H19V6Z" /></Icon>
          </Center>
          <Center marginLeft={2}>
            <Text>{User.email}</Text>
          </Center>
        </HStack>
      </VStack>

      <Button bg={"orange.400"} rounded="10" w="70%" h="10" alignSelf={"center"} marginTop={7}>
          <Text style={{fontWeight: "bold", color: "white"}}>Actualizar datos</Text>
      </Button>

      <View h={"55%"} justifyContent={"flex-end"}>
        <Button bg={"orange.400"} rounded="10" w="70%" h="10" alignSelf={"center"} onPress={() => cerrarSesion()}>
            <Text style={{fontWeight: "bold", color: "white"}}>Cerrar Sesión</Text>
        </Button>
      </View>
      
    </View>

  )
}

const styles = StyleSheet.create({
  noms: {
    fontWeight: "bold",
    fontSize: 17,
  },


});

export default ProfileScreen;
import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Box, Actionsheet, Center, Text, Image, Select, CheckIcon, ScrollView, Button, Pressable, FlatList, VStack, HStack } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

import EjercicioItem from '../components/EjercicioItem.jsx';
import TopBar from "../components/TopBar.jsx";
import BottomBar from "../components/BottomBar.jsx";


const HomeScreen = ({ navigation }) => {
  const [listadoEjercicio, setlistadoEjercicio] = useState([]);
  const [listadoCombo, setlistadoCombo] = useState([]);
  const [service, setService] = React.useState("");
  const [Ejercicio, setEjercicio] = useState({});
  const [cantidad, setCantidad] = useState({});
  const {height} = Dimensions.get ('screen');
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const obtenerEjercicios = async (body_part_id = null) => {
    try {
      const member_id = await AsyncStorage.getItem('member_id');
      const ruta = body_part_id == null || body_part_id == "" ?
        `${RUTA_BACKEND}/member/exercises?member_id=${member_id}` :
        `${RUTA_BACKEND}/member/exercises?member_id=${member_id}&body_part_id=${body_part_id}`
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json()
      setlistadoEjercicio(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Llamada obtener ejercicios")
    }
  };

  const obtenerPartesdelCuerpo = async () => {
    try {
      const member_id = await AsyncStorage.getItem('member_id');
      const ruta = `${RUTA_BACKEND}/member/body_parts/?member_id=${member_id}`;
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json()
      console.log("COMBOOOO");
      console.log(ruta);
      console.log(data);
      setlistadoCombo(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Obtener combo")
    }
  };


  const obtenerDataUser = async () => {
    const memberID = await AsyncStorage.getItem('member_id');
    console.log(memberID);
  }
  
  const obtenerEjercicioSingular = async (exercise_id) => {
    try 
    {
      setIsOpen(true);
      const member_id = await AsyncStorage.getItem('member_id');
      console.log("Ejercicio: " + exercise_id);
      const ruta = `${RUTA_BACKEND}/member/exercise?member_id=${member_id}&exercise_id=${exercise_id}`
      console.log(ruta);
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json();
      data.video_url = data.video_url.split('=')[1];
      console.log(data.video_url);
      setEjercicio(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Llamada obtener ejercicio singular (Home)")
    }
  };

  const mapEjercicios = ({ item }) => {
    return <Pressable style={styles.ex} rounded="8">
      <VStack alignContent="space-between" space={2}>
        <Center>
          <Image source={{
            uri: RUTA_BACKEND + "/" + item.image_url
          }} alt={item.name} w="100" h="100" />
        </Center>
        <Center>
          <Text numberOfLines={2} > {item.name} </Text>
        </Center>
      </VStack>
    </Pressable>
  }
  
  const renderItem = useCallback(({ item }) => {
    return (
      <EjercicioItem item={item} onPress={() => obtenerEjercicioSingular(item.id)} />
    );
  }, []);

  const obtenerCantidades = async () => {
    try 
    {
      const member_id = await AsyncStorage.getItem('member_id');
      const ruta = `${RUTA_BACKEND}/member/exercises_body_parts?member_id=${member_id}`
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json();
      setCantidad(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Llamada obtener cantidad ejercicios")
    }
  };

  useEffect(() => {
    obtenerPartesdelCuerpo();
    obtenerDataUser();  
    obtenerCantidades();
  }, [])

  useEffect(() => {
    obtenerEjercicios(service);
  }, [service])

  return (
    <View style={{ justifyContent: "space-between", height: "155%", position: 'relative' }}>
      <TopBar navigation={navigation} />
      <HStack space={2} marginY={"7%"}>
        <VStack marginLeft={"10%"}>
          <Center>
            <Text style={styles.nums}>{cantidad.exercises}</Text>
          </Center>
          <Center>
            <Text>Ejercicios Asignados</Text>
          </Center>
        </VStack>
        <VStack>
          <Center >
            <Text style={styles.nums}>{cantidad.body_parts}</Text>
          </Center>
          <Center w="80%"  marginLeft={4}> 
            <Text textAlign={"center"}>Partes del cuerpo entrenadas</Text>
          </Center>
        </VStack>
      </HStack>
      <Select selectedValue={service}
        w="85%"
        alignItems={"center"}
        marginBottom={7}
        placeholder="Body Part" _selectedItem={{ endIcon: <CheckIcon size="5" /> }}
        mt={1}
        onValueChange={itemValue => setService(itemValue)}>
        <Select.Item label="Seleccionar..." value="" />
        {
          listadoCombo.map((part) => {
            return <Select.Item label={part.name} value={part.id} />
          })
        }
      </Select>
    
      <FlatList
        data={listadoEjercicio}
        renderItem={renderItem}
        keyExtractor={(ex) => ex.id.toString()}
        numColumns={3} 
        
        ListFooterComponentStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        contentContainerStyle={{ flexGrow: 5 }}
      />

      <BottomBar navigation={navigation} style={styles.footer} />

      <Actionsheet isOpen={isOpen} onClose={onClose} >
        <Actionsheet.Content>
          <Box w="100%" px={4} justifyContent="center">
            <Text fontSize="20" color="gray.500" _dark={{
              color: "gray.300"
            }} textAlign={"center"} marginTop={3} marginBottom={5}>
              {Ejercicio.name}
            </Text>
            <HStack space={2} justifyContent={"center"} marginBottom={7}> 
              <VStack space={2}>
                <Center>
                  <Text fontWeight={"bold"} fontSize={24}>{Ejercicio.reps}</Text>
                </Center>
                <Center>
                  <Text fontSize={16}>Repeticiones</Text>
                </Center>
              </VStack>
              <VStack space={2} marginLeft={20}>
                <Center>
                  <Text fontWeight={"bold"} fontSize={24}>{Ejercicio.sets}</Text>
                </Center>
                <Center>
                  <Text fontSize={16}>Series</Text>
                </Center>
              </VStack>
            </HStack>
            <Text paddingX={5} fontSize={16} marginBottom={5}>
              {Ejercicio.description}
            </Text>
            <Button bg="orange.500" onPress={() => navigation.navigate("VideoPlayer", {url: Ejercicio.video_url})}>
              Ver video
            </Button>
            <Actionsheet.Item isDisabled>..</Actionsheet.Item>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </View >

  )
}

const styles = StyleSheet.create({
  ex: {
    backgroundColor: '#fb923c',
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1 / 3,
    justifyContent: 'center',
    padding: 10,
    margin: 5
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },
  nums: {
    fontSize: 20,
    fontWeight: "bold"
  }


});

export default HomeScreen;
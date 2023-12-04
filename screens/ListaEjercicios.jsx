import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDisclose, Box, Actionsheet, Center, Text, Image, Select, CheckIcon, ScrollView, Button, Pressable, FlatList, VStack } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';

import EjercicioItem from '../components/EjercicioItem.jsx';
import TopBar from "../components/TopBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

const ListaScreen = ({ navigation }) => {
  const [listadoEjercicio, setlistadoEjercicio] = useState([]);
  const [listadoCombo, setlistadoCombo] = useState([]);
  const [service, setService] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);

  const [Ejercicio, setEjercicio] = useState({});

  const obtenerEjercicios = async (body_part_id = null) => {
    try {
      const ruta =
        body_part_id == null || body_part_id === "" ?
          `${RUTA_BACKEND}/exercise/list` :
          `${RUTA_BACKEND}/exercise/list/?body_part_id=${body_part_id}`
      const response = await fetch(ruta)
      const resp = await response;
      const data = await resp.json()
      setlistadoEjercicio(data);
    } catch (error) {
      console.error(error);
      console.log("Error: -" + error)
    } finally {
      console.log("Finally: Llamada obtener ejercicios - Lista")
    }
  };

  const obtenerPartesdelCuerpo = async () => {
    try {
      const ruta = `${RUTA_BACKEND}/body_part/list`;
      const response = await fetch(ruta);
      const resp = await response;
      const data = await resp.json();
      setlistadoCombo(data);
    } catch (error) {
      console.log(error);
      console.log("Error: -" + error);
    } finally {
      console.log("Finally: Llamada obtener body parts - Lista");
    }
  };

  const obtenerEjercicioSingular = async (exercise_id) => {
    try {
      setIsOpen(true);
      console.log("Ejercicio: " + exercise_id);
      const ruta = `${RUTA_BACKEND}/exercise/find?exercise_id=${exercise_id}`
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
      console.log("Finally: Llamada obtener ejercicio singular")
    }
  };

  const mapEjercicios = ({ item }) => {
    return <Button style={styles.ex} rounded="8" onPress={() => obtenerEjercicioSingular(item.id)}>
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
    </Button>
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <EjercicioItem item={item} onPress={() => obtenerEjercicioSingular(item.id)} />
    );
  }, []);

  useEffect(() => {
    obtenerPartesdelCuerpo();
  }, [])

  useEffect(() => {
    obtenerEjercicios(service);
  }, [service])


  return (
    <View style={{ justifyContent: "space-between", height: "155%", position: 'relative' }}>
      <TopBar navigation={navigation} />
      <Select selectedValue={service}
        marginTop={10}
        w="85%"
        alignItems={"center"}
        marginBottom={7}
        placeholder="Body Part" _selectedItem={{ endIcon: <CheckIcon size="5" /> }}
        mt={1}
        onValueChange={itemValue => setService(itemValue)}>
        <Select.Item label="Partes del Cuerpo" value="" />
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
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'green',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },


});

export default ListaScreen;
import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Center, Text, Image, Select, CheckIcon, ScrollView, Button, Pressable, FlatList, VStack } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from "../components/TopBar.jsx";
import BottomBar from "../components/BottomBar.jsx";


const ListaScreen = ({ navigation }) => {
  const [listadoEjercicio, setlistadoEjercicio] = useState([]);
  const [listadoCombo, setlistadoCombo] = useState([]);
  const [service, setService] = React.useState("");
  const {height} = Dimensions.get ('screen');
  //const [listadoCombo, setlistadoCombo] = useState([])

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
      console.log("Finally: Llamada obtener ejercicios")
    }
  };

  const obtenerPartesdelCuerpo = async () => {
    try {
      const ruta =`${RUTA_BACKEND}/body_part/list`;
      const response = await fetch(ruta);
      const resp = await response;
      const data = await resp.json();
      setlistadoCombo(data);
    } catch (error) {
      console.log(error);
      console.log("Error: -" + error);
    } finally {
      console.log("Finally: Llamada obtener body parts (Home)");
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
  //console.log(height);
  useEffect(() => {
    obtenerEjercicios();
    obtenerPartesdelCuerpo();
    
  }, [])

  useEffect(() => {
    obtenerEjercicios(service);
  }, [service])

  return (
    <View style={{ justifyContent: "space-between", height: 1100, position: 'relative' }}>
      <TopBar navigation={navigation} />
      <Select selectedValue={service}
        minWidth="200"
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
      <Text> Ejercicios </Text>

      <FlatList
        data={listadoEjercicio}
        renderItem={mapEjercicios}
        keyExtractor={(ex) => ex.id.toString()}
        numColumns={3} 
        style={{backgroundColor: "#A3F4C8"}}
        ListFooterComponentStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        contentContainerStyle={{ flexGrow: 5 }}
      />

      <BottomBar navigation={navigation} style={styles.footer} />
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
    backgroundColor:'green',
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },


});

export default ListaScreen;
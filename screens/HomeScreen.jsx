import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Select, CheckIcon, ScrollView } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";

import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from "../components/TopBar.jsx";
import BottomBar from "../components/BottomBar.jsx";


const HomeScreen = ({ navigation }) => {
  const [listadoEjercicio, setlistadoEjercicio] = useState([]);
  const [listadoCombo, setlistadoCombo] = useState([]);
  const [service, setService] = React.useState("");
  //const [listadoCombo, setlistadoCombo] = useState([])

  const obtenerEjercicios = async (body_part_id = null) => {
    try {
      const ruta = body_part_id == null ?
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

  const obtenerPartesdelCuerpo = async (member_id = null) => {
    try {
      const ruta = `${RUTA_BACKEND}/member/body_parts/?member_id=${4}`;
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
  useEffect(() => {
    obtenerEjercicios();
    obtenerPartesdelCuerpo();
    obtenerDataUser();
  }, [])

  return (
    <View>
      <TopBar navigation={navigation} />
      <ScrollView h="100%">
        <Select selectedValue={service}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service" _selectedItem={{ endIcon: <CheckIcon size="5" /> }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Seleccionar..." value="" />
          {
            listadoCombo.map((part) => {
              return <Select.Item label={part.name} value={part.id} />
            })
          }
        </Select>
        <Text>
          Home

        </Text>
        {
          listadoEjercicio.map((excercise) => {
            return <Text>{excercise.name}</Text>
          })
        }
        <Text>  </Text>

      </ScrollView>
      <BottomBar navigation={navigation} />
    </View>

  )
}

export default HomeScreen;
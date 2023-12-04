import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDisclose, Box, Actionsheet, Center, Text, Image, Select, CheckIcon, ScrollView, Button, Pressable, FlatList, VStack } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";
import { WebView } from 'react-native-webview';


const VideoPlayer = ({ route, navigation }) => {
  const { url  } = route.params;
  return (
    <>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={false}
        source={{ uri: `https://www.youtube.com/embed/${url}?rel=0&autoplay=0&showinfo=0&controls=0` }} />
    </>
  )
}

export default VideoPlayer;

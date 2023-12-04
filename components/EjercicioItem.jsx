import { memo } from "react";
import { StyleSheet } from "react-native";
import { Image, Button, VStack, Center, Text } from "native-base";
import { RUTA_BACKEND } from "../ruta_back.js";

const EjercicioItem = ({ item, onPress }) => {

  return (
    <Button style={styles.ex} rounded="8" onPress={onPress}>
      <VStack alignContent="space-between" space={2}>
        <Center>
          <Image
            source={{
              uri: RUTA_BACKEND + "/" + item.image_url,
            }} alt={item.name} w="100" h="100"
          />
        </Center>
        <Center>
          <Text numberOfLines={2}> {item.name} </Text>
        </Center>
      </VStack>
    </Button>
  );
};

const styles = StyleSheet.create({
  ex: {
    backgroundColor: "#fb923c",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1 / 3,
    justifyContent: "center",
    padding: 10,
    margin: 5,
  },
});

export default memo(EjercicioItem, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
})
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { imagePickerImageUrl } from "@/constants/Image";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { SelectCategory } from "@/types";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Page() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>();
  const [categories, setCategories] = useState<SelectCategory[]>([]);
  const [loadingForCategory, setLoadingForCategory] = useState<boolean>();

  const getCategories = async () => {
    setLoadingForCategory(true);
    setCategories([]);

    const q = query(collection(db, "categories"));

    const querySnapshot = await getDocs(q);

    //? Check the type is matching
    querySnapshot.forEach((doc) => {
      setCategories((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.data().name },
      ]);
    });
    setLoadingForCategory(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Add new Business",
    });
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View
      style={{
        padding: AppStyle.mainPadding,
      }}
    >
      <View
        style={{
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: AppStyle.bodyText,
            fontWeight: "900",
          }}
        >
          Add your Business
        </Text>
        <Text>Fill all the information to create your business</Text>
      </View>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={imagePickerImageUrl} style={styles.image} />
        )}
      </TouchableOpacity>
      <View
        style={{
          marginVertical: 12,
          gap: 12,
        }}
      >
        <TextInput placeholder="Name" style={styles.inputText} />
        <TextInput placeholder="Address" style={styles.inputText} />
        <TextInput placeholder="Phone" style={styles.inputText} />
        <TextInput placeholder="Email" style={styles.inputText} />
        <TextInput
          placeholder="Address"
          numberOfLines={4}
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.primary,
            textAlignVertical: "top",
          }}
        />
        <RNPickerSelect
          disabled={loadingForCategory}
          onValueChange={(value) => console.log(value)}
          items={categories}
        />
        <TouchableOpacity onPress={() => {}} style={styles.btn}>
          <Text
            style={{
              textAlign: "center",
              fontSize: AppStyle.bodyText,
              color: "#fff",
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  inputText: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    marginTop: 20,
  },
});

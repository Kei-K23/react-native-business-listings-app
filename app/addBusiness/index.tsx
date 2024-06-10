import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { imagePickerImageUrl } from "@/constants/Image";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { SelectCategory } from "@/types";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db, storeDb } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function Page() {
  const { user } = useUser();
  const navigation = useNavigation();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>();
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [about, setAbout] = useState<string>();
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
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleOnPress = async () => {
    const name = Date.now().toString() + ".jpg";
    const resp = await fetch(imageUrl!);
    const blob = await resp.blob();

    const imageUrlRef = ref(storeDb, "business-listing-app/" + name);

    uploadBytes(imageUrlRef, blob)
      .then((snapShort) => {
        console.log("Uploaded...");
      })
      .then((resp) => {
        getDownloadURL(imageUrlRef).then((downloadUrl) => {
          handleSaveBusiness(downloadUrl);
        });
      });
  };

  const handleSaveBusiness = async (downloadUrl: string) => {
    try {
      await addDoc(collection(db, "businesses"), {
        name,
        email,
        phone,
        address,
        category,
        about,
        imageUrl: downloadUrl,
        userId: user?.id,
      });
      ToastAndroid.show("Successfully created business", ToastAndroid.BOTTOM);
      router.push("/(tabs)/profile");
    } catch (e) {
      ToastAndroid.show("Something went wrong", ToastAndroid.BOTTOM);
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
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
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
        <TextInput
          placeholder="Name"
          style={styles.inputText}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Address"
          style={styles.inputText}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          placeholder="Phone"
          style={styles.inputText}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputText}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="About"
          numberOfLines={4}
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.primary,
            textAlignVertical: "top",
          }}
          onChangeText={(text) => setAbout(text)}
        />
        <RNPickerSelect
          disabled={loadingForCategory}
          onValueChange={(value) => setCategory(value)}
          items={categories}
        />
        <TouchableOpacity onPress={handleOnPress} style={styles.btn}>
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

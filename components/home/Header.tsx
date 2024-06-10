import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Header() {
  const { user } = useUser();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleOnSubmitEditing = () => {
    if (!search) return;
    router.push(`/explore?search=${search}`);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: user?.imageUrl,
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={{ color: "#fff" }}>Welcome,</Text>
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={"#ccc"} />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
          }}
          onSubmitEditing={handleOnSubmitEditing}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: AppStyle.mainPadding,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: AppStyle.padding,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 8,
    marginTop: 10,
  },
});

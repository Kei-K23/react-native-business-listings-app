import BusinessListItem from "@/components/BusinessLists/BusinessListItem";
import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";

import { Business } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function BusinessListsByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [businesses, seBusinesses] = useState<Business[]>([]);

  const getBusinesses = async () => {
    seBusinesses([]);

    const q = query(
      collection(db, "businesses"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    //? Check the type is matching
    querySnapshot.forEach((doc) => {
      seBusinesses((prev) => [...prev, doc.data() as Business]);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinesses();
  }, []);

  return (
    <View>
      {businesses?.length > 0 ? (
        <FlatList
          data={businesses}
          renderItem={({ item }) => <BusinessListItem item={item} />}
        />
      ) : (
        <Text
          style={{
            fontSize: AppStyle.bodyText,
            marginTop: "20%",
            fontWeight: "800",
            textAlign: "center",
            color: "#444",
            padding: AppStyle.mainPadding,
          }}
        >
          No businesses found for {category}
        </Text>
      )}
    </View>
  );
}

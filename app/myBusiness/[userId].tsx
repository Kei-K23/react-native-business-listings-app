import BusinessListItem from "@/components/businessLists/BusinessListItem";
import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";

import { Business } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

export default function Page() {
  const navigation = useNavigation();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getBusinesses = async () => {
    setIsLoading(true);
    setBusinesses([]);

    const q = query(
      collection(db, "businesses"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    const fetchedBusinesses: Business[] = [];
    querySnapshot.forEach((doc) => {
      fetchedBusinesses.push({ id: doc.id, ...(doc.data() as Business) });
    });

    setBusinesses(fetchedBusinesses);
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getBusinesses();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
    });
    getBusinesses();
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: "50%" }}
          size={"large"}
          color={Colors.primary}
        />
      ) : businesses.length > 0 ? (
        <FlatList
          data={businesses}
          renderItem={({ item }) => <BusinessListItem item={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
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
          No businesses create yet
        </Text>
      )}
    </View>
  );
}

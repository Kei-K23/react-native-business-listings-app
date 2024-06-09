import BusinessDetail from "@/components/businessDetail/BusinessDetail";
import { db } from "@/config/firebase";
import { Colors } from "@/constants/Colors";
import { Business } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function BusinessDetailById() {
  const navigation = useNavigation();
  const { businessId } = useLocalSearchParams<{
    businessId: string;
  }>();
  const [business, setBusiness] = useState<Business>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const getBusinessDetailById = async (businessId?: string) => {
    if (!businessId) return;
    setIsLoading(true);

    const docRef = doc(db, "businesses", businessId);
    const docData = await getDoc(docRef);

    if (docData.exists()) {
      setBusiness(docData.data() as Business);
    } else {
      console.error("No such document");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getBusinessDetailById(businessId);
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          style={{
            marginTop: "50%",
          }}
          size={"large"}
          color={Colors.primary}
        />
      ) : business ? (
        <View>
          <BusinessDetail business={business!} />
        </View>
      ) : (
        <View>
          <Text>Error</Text>
        </View>
      )}
    </View>
  );
}

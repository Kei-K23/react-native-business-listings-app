import BusinessListItem from "@/components/businessLists/BusinessListItem";
import Categories from "@/components/home/Categories";
import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Business } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, Query, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Explore() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getBusinesses();
    setIsRefreshing(false);
  }, [category]);

  const getBusinesses = async () => {
    setIsLoading(true);
    setBusinesses([]);

    try {
      let q: Query;
      if (category) {
        q = query(
          collection(db, "businesses"),
          where("category", "==", category)
        );
      } else {
        q = query(collection(db, "businesses"));
      }

      const querySnapshot = await getDocs(q);
      const fetchedBusinesses: Business[] = [];
      querySnapshot.forEach((doc) => {
        fetchedBusinesses.push({ id: doc.id, ...(doc.data() as Business) });
      });

      setBusinesses(fetchedBusinesses);
    } catch (error) {
      console.error("Error fetching businesses: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBusinesses();
  }, [category]);

  return (
    <View style={{ flex: 1, padding: AppStyle.mainPadding, paddingTop: 30 }}>
      <Text style={{ fontSize: AppStyle.subTitle, fontWeight: "900" }}>
        Explore More
      </Text>

      <View style={{ ...styles.searchContainer, marginBottom: 10 }}>
        <FontAwesome name="search" size={16} color={"#ccc"} />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
      </View>

      <Categories
        isInsideExploreScreen={true}
        onCategoriesSelect={(selectedCategory) => setCategory(selectedCategory)}
      />

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
            renderItem={({ item }) => (
              <BusinessListItem item={item} isInsideExplore={true} />
            )}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            style={{
              marginTop: 10,
            }}
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
    </View>
  );
}

const styles = StyleSheet.create({
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

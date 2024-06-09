import Categories from "@/components/home/Categories";
import { AppStyle } from "@/constants/AppStyle";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function explore() {
  return (
    <View
      style={{
        padding: AppStyle.mainPadding,
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontSize: AppStyle.subTitle,
          fontWeight: "900",
        }}
      >
        Explore More
      </Text>

      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={"#ccc"} />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
          }}
        />
      </View>

      <Categories />
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

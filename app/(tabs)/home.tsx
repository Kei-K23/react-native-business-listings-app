import Header from "@/components/home/Header";
import Services from "@/components/home/Services";
import Categories from "@/components/home/Services copy";
import { View } from "react-native";

export default function home() {
  return (
    <View>
      {/* Header */}
      <Header />

      {/* Slider for services */}
      <Services />

      {/* Slider for categories */}
      <Categories />
    </View>
  );
}

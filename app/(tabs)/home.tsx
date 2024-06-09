import BusinessLists from "@/components/home/BusinessLists";
import Categories from "@/components/home/Categories";
import Header from "@/components/home/Header";
import Services from "@/components/home/Services";

import { ScrollView, View } from "react-native";

export default function home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header />

      {/* Slider for services */}
      <Services />

      {/* Slider for categories */}
      <Categories />

      {/* Popular business */}
      <BusinessLists />

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

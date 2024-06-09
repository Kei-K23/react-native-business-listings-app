import { Business } from "@/types";
import React from "react";
import { View } from "react-native";
import Intro from "./Intro";

type BusinessDetailProps = {
  business: Business;
};

export default function BusinessDetail({ business }: BusinessDetailProps) {
  return (
    <View>
      {/* Intro section */}
      <Intro business={business} />
    </View>
  );
}

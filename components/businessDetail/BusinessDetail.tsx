import { Business } from "@/types";
import React from "react";
import { View } from "react-native";
import Intro from "./Intro";
import ActionBtns from "./ActionBtns";
import About from "./About";

type BusinessDetailProps = {
  business: Business;
};

export default function BusinessDetail({ business }: BusinessDetailProps) {
  return (
    <View>
      {/* Intro section */}
      <Intro business={business} />

      {/* Action btns section */}
      <ActionBtns business={business} />

      {/* About section */}
      <About name={business.name} about={business.about!} />
    </View>
  );
}

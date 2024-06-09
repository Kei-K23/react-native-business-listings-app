import { Business } from "@/types";
import React from "react";
import { ScrollView, Text } from "react-native";
import Intro from "./Intro";
import ActionBtns from "./ActionBtns";
import About from "./About";
import Reviews from "./Reviews";

type BusinessDetailProps = {
  business: Business;
};

export default function BusinessDetail({ business }: BusinessDetailProps) {
  return (
    <ScrollView>
      {/* Intro section */}
      <Intro business={business} />

      {/* Action btns section */}
      <ActionBtns business={business} />

      {/* About section */}
      <About about={business.about!} />

      {/* Reviews */}
      <Reviews business={business} />
    </ScrollView>
  );
}

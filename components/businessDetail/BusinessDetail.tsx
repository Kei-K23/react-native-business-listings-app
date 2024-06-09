import { Business } from "@/types";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import Intro from "./Intro";
import ActionBtns from "./ActionBtns";
import About from "./About";
import Reviews from "./Reviews";

type BusinessDetailProps = {
  business: Business;
};

const BusinessDetail = ({ business }: BusinessDetailProps) => {
  const sections = [
    { key: "intro", render: () => <Intro business={business} /> },
    { key: "actionBtns", render: () => <ActionBtns business={business} /> },
    { key: "about", render: () => <About about={business.about!} /> },
    { key: "reviews", render: () => <Reviews business={business} /> },
  ];

  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => <View>{item.render()}</View>}
      keyExtractor={(item) => item.key}
    />
  );
};

export default BusinessDetail;

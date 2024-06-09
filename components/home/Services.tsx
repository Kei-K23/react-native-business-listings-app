import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Slider } from "@/types";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function Services() {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const getSliders = async () => {
    setSliders([]);

    const q = query(collection(db, "sliders"));

    const querySnapshot = await getDocs(q);

    //? Check the type is matching
    querySnapshot.forEach((doc) => {
      setSliders((prev) => [...prev, doc.data() as Slider]);
    });
  };

  useEffect(() => {
    getSliders();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: AppStyle.smallTitle,
          padding: 20,
          fontWeight: "700",
        }}
      >
        # Special for you
      </Text>
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: AppStyle.mainPadding,
          paddingRight: AppStyle.padding,
        }}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item?.imageUrl,
            }}
            style={{
              width: 300,
              height: 160,
              borderRadius: 10,
              marginRight: 14,
              backgroundColor: Colors.primary,
            }}
          />
        )}
      />
    </View>
  );
}

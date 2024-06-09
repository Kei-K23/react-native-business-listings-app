import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Business } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";

type ReviewsProps = {
  business: Business;
};

export default function Reviews({ business }: ReviewsProps) {
  const [rating, setRating] = useState<number>(3);
  const [review, setReview] = useState<string>("");
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>();
  const reviewInputRef = useRef<TextInput>(null);

  const handleOnPress = async () => {
    setIsLoading(true);
    const docRef = doc(db, "businesses", business?.id!);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        review: review,
        userName: user?.fullName,
        imageUrl: user?.imageUrl,
      }),
    });
    setIsLoading(false);
    ToastAndroid.show("Review added successfully", ToastAndroid.BOTTOM);
    setRating(3);
    setReview("");
    reviewInputRef.current?.clear();
  };
  return (
    <View
      style={{
        paddingHorizontal: AppStyle.mainPadding,
        paddingVertical: 10,
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: AppStyle.bodyText,
          fontWeight: "900",
        }}
      >
        Reviews
      </Text>
      <View>
        <Rating
          showRating={false}
          startingValue={rating}
          onFinishRating={(rating: number) => setRating(rating)}
          style={{
            paddingVertical: 10,
          }}
          imageSize={30}
        />
        <TextInput
          ref={reviewInputRef}
          placeholder="Write your review"
          numberOfLines={4}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: "ccc",
            textAlignVertical: "top",
          }}
          onChangeText={(text: string) => setReview(text)}
        />

        <TouchableOpacity
          disabled={!review || isLoading}
          onPress={handleOnPress}
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 99,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: AppStyle.bodyText,
              color: "#fff",
            }}
          >
            Review
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews && business?.reviews?.length > 0 ? (
          business?.reviews?.map((item, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#ccc",
                marginTop: 10,
                padding: AppStyle.padding,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={{
                  uri: item?.imageUrl,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 99,
                }}
              />
              <View>
                <Text style={{ fontWeight: "800" }}>{item.userName}</Text>
                <Text
                  style={{
                    marginTop: 5,
                  }}
                >
                  {item.review}
                </Text>
                <Rating
                  showRating={false}
                  startingValue={item.rating}
                  imageSize={14}
                />
              </View>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

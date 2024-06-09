import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { AppStyle } from "@/constants/AppStyle";
import { loginScreenImgUrl } from "@/constants/Image";
import { Colors } from "@/constants/Colors";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        // @ts-ignore
        setActive({
          session: createdSessionId,
        });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: loginScreenImgUrl,
        }}
        style={styles.img}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: -20,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: AppStyle.subTitle,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.primary }}>
            Community Business Listing App
          </Text>
          to grow your business
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#aaa", fontWeight: "600" }}>
          Find your business near your and post your own business to community.
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text
          style={{
            textAlign: "center",
            fontSize: AppStyle.bodyText,
            color: "#fff",
          }}
        >
          Login with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  img: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#000",
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    marginTop: 20,
  },
});

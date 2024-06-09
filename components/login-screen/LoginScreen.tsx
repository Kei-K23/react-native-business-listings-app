import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { AppStyle } from "@/constants/AppStyle";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

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
      <TouchableHighlight onPress={onPress}>
        <Text>Login with Google</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: AppStyle.padding,
  },
});

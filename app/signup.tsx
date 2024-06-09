import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function SignUp() {
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
    <View>
      <Text>Login screen</Text>
      <TouchableHighlight onPress={onPress}>
        <Text>Login with Google</Text>
      </TouchableHighlight>
    </View>
  );
}

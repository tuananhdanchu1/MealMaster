import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface UserAvatarProps {
  uri: string;
  size?: number;
  style?: object;
}

export default function UserAvatar({ uri, size = 32, style = {} }: UserAvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
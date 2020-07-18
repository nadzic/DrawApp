export const DiaryScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Diaries"
        onPress={() => navigation.navigate('Diary')}
      />
    </View>
  );
};

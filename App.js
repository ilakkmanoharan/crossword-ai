
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { getCrosswordClues } from './utils/openai';
import { supabase } from "./utils/supabase";

export default function App() {
  const [topic, setTopic] = useState("chemistry");
  const [clues, setClues] = useState([]);

  useEffect(() => {
    async function fetchClues() {
      const data = await getCrosswordClues(topic);
      setClues(data);
    }
    fetchClues();
  }, [topic]);

  return (
    <View className="flex-1 p-4 bg-gray-900">
      <Text className="text-white text-xl font-bold mb-4">
        AI Crossword: {topic}
      </Text>

      <FlatList
        data={clues}
        keyExtractor={(item) => item.answer}
        renderItem={({ item }) => (
          <View className="mb-2">
            <Text className="text-white font-semibold">{item.clue}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => setTopic("physics")}
        className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
      >
        <Text className="text-white">Change Topic</Text>
      </TouchableOpacity>
    </View>
  );
}

const fetchUserCrosswords = async () => {
  const { data, error } = await supabase.from("crosswords").select("*");
  if (error) console.error(error);
  return data;
};


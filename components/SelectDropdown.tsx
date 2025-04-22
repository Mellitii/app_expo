import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown, X, Check } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence
} from 'react-native-reanimated';

interface Option {
  label: string;
  value: string | number;
}

interface SelectDropdownProps {
  label: string;
  value: string | number;
  options: Option[];
  onSelect: (value: string | number) => void;
  placeholder?: string;
}

export default function SelectDropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Sélectionner une option'
}: SelectDropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;
  
  const labelScale = useSharedValue(1);
  const rotate = useSharedValue('0deg');
  
  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: labelScale.value }]
    };
  });
  
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate.value }]
    };
  });

  const openModal = () => {
    setModalVisible(true);
    rotate.value = withTiming('180deg', { duration: 300 });
    
    labelScale.value = withSequence(
      withTiming(1.05, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    rotate.value = withTiming('0deg', { duration: 300 });
  };

  const handleSelect = (selectedValue: string | number) => {
    onSelect(selectedValue);
    closeModal();
  };

  const renderItem = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={[styles.optionItem, item.value === value && styles.selectedItem]}
      onPress={() => handleSelect(item.value)}
    >
      <Text style={[styles.optionText, item.value === value && styles.selectedText]}>
        {item.label}
      </Text>
      {item.value === value && <Check size={20} color="#3B82F6" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
      </Animated.Text>
      
      <TouchableOpacity
        style={styles.selectButton}
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.selectText,
          !selectedOption && styles.placeholderText
        ]}>
          {displayValue}
        </Text>
        <Animated.View style={animatedIconStyle}>
          <ChevronDown size={20} color="#64748B" />
        </Animated.View>
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#334155" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 8,
    color: '#334155',
  },
  selectButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  selectText: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Poppins-Regular',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    fontFamily: 'Poppins-Bold',
  },
  optionsList: {
    paddingHorizontal: 8,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Poppins-Regular',
  },
  selectedText: {
    color: '#3B82F6',
    fontFamily: 'Poppins-Medium',
  },
});
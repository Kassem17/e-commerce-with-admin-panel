import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";

interface AddressFormData {
  label: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

interface AddressFormModalProps {
  visible: boolean;
  isEditing: boolean;
  addressForm: AddressFormData;
  isAddingAddress: boolean;
  isUpdatingAddress: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (form: AddressFormData) => void;
}

const AddressFormModal = ({
  visible,
  isEditing,
  addressForm,
  isAddingAddress,
  isUpdatingAddress,
  onClose,
  onSave,
  onFormChange,
}: AddressFormModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeScreen>
          {/* HEADER */}
          <View className="px-6 py-6 border-b border-surface flex-row items-center justify-between">
            <Text className="text-text-primary text-2xl font-bold">
              {isEditing ? "Edit Address" : "Add New Address"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="p-6">
              {/* LABEL INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Label
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.label}
                  placeholder="e.g., Home, Work, Office"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, label: text })
                  }
                />
              </View>

              {/* NAME INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.fullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, fullName: text })
                  }
                />
              </View>

              {/* ADDRESS INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Street Address
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.streetAddress}
                  placeholder="Street address, apt/suite number"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, streetAddress: text })
                  }
                />
              </View>

              {/* CITY INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  City
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.city}
                  placeholder="e.g., Beirut"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, city: text })
                  }
                />
              </View>

              {/* STATE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  State
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.state}
                  placeholder="e.g., NY"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, state: text })
                  }
                />
              </View>

              {/* ZIPCODE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  ZIP Code
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.zipCode}
                  placeholder="e.g., Home, Work, Office"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, zipCode: text })
                  }
                  keyboardType="numeric"
                />
              </View>

              {/* PHONE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Phone Number
                </Text>
                <TextInput
                  className="bg-surface text-text-primary px-4 py-4 rounded-2xl text-base"
                  value={addressForm.phoneNumber}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666"
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, phoneNumber: text })
                  }
                  keyboardType="phone-pad"
                />
              </View>

              {/* DEFAULT ADDRESS SWITCH */}
              <View className="bg-surface rounded-2xl p-4 flex-row items-center justify-between mb-6">
                <Text className="text-text-primary font-semibold">
                  Set as default address
                </Text>
                <Switch
                  value={addressForm.isDefault}
                  onValueChange={(value) =>
                    onFormChange({ ...addressForm, isDefault: value })
                  }
                  thumbColor="white"
                  trackColor={{ true: "#33FF00" }}
                />
              </View>

              {/* SAVE BUTTON */}
              <TouchableOpacity
                className="bg-primary rounded-2xl py-5 items-center"
                activeOpacity={0.8}
                onPress={onSave}
                disabled={isAddingAddress || isUpdatingAddress}
              >
                {isAddingAddress || isUpdatingAddress ? (
                  <ActivityIndicator size="small" color="#121212" />
                ) : (
                  <Text className="text-background font-bold text-lg">
                    {isEditing ? "Save changes" : "Add Address"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeScreen>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressFormModal;

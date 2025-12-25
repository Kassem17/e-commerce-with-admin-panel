import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAddresses } from "@/hooks/useAddresses";
import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import AddressesHeader from "@/components/AddressesHeader";
import { LoadingUI } from "@/components/LoadingUI";
import { ErrorUI } from "@/components/ErrorUI";
import { Address } from "@/types";
import AddressFormModal from "@/components/AddressFormModal";
import AddressCard from "@/components/AddressCard";

const AddressesScreen = () => {
  const {
    addAddress,
    deleteAddress,
    updateAddress,
    addresses, 
    isAddingAddress,
    isDeletingAddress,
    isUpdatingAddress,
    isLoading,
    isError,
  } = useAddresses();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: "",
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    isDefault: false,
  });

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setEditingAddressId(null);
    setAddressForm({
      label: "",
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      isDefault: false,
    });
  };

  const handleEditAddress = (address: Address) => {
    setShowAddressForm(true);
    setEditingAddressId(address._id);
    setAddressForm({
      label: address.label,
      fullName: address.fullName,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phoneNumber: address.phoneNumber,
      isDefault: address.isDefault,
    });
  };
  const handleDeleteAddress = (addressId: string, label: string) => {
    Alert.alert("Delete Address", `Are you sure you want to delete ${label}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteAddress(addressId),
      },
    ]);
  };

  const handleSaveAddress = () => {
    if (
      !addressForm.label ||
      !addressForm.fullName ||
      !addressForm.streetAddress ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.zipCode ||
      !addressForm.phoneNumber
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (editingAddressId) {
      // update an existing address

      // we add the variables as an object according how we add them in the mutation function
      updateAddress(
        {
          addressId: editingAddressId,
          addressData: addressForm,
        },
        {
          onSuccess: () => {
            setShowAddressForm(false);
            Alert.alert("Success", "Address updated successfully");
          },
          onError: (error: any) => {
            Alert.alert(
              "Error",
              error?.response?.data?.error || "Failed to update address"
            );
          },
        }
      );
    } else {
      // create new address
      addAddress(addressForm, {
        onSuccess: () => {
          setShowAddressForm(false);
          Alert.alert("Success", "Address Added successfully");
        },
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error?.response?.data?.error || "Failed to add address"
          );
        },
      });
    }
  };

  const handleCloseAddressForm = () => {
    setShowAddressForm(false);
    if (editingAddressId) {
      setEditingAddressId(null);
    }
  };

  if (isLoading) {
    return <LoadingUI text="Loading addresses..." />;
  }
  if (isError) {
    return (
      <ErrorUI
        text1="Failed to load addresses"
        text2="Please check your connection and try again"
      />
    );
  }

  return (
    <SafeScreen>
      <AddressesHeader />
      {addresses.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="location-outline" size={80} color="#666" />
          <Text className="text-text-primary font-semibold text0xl mt-4">
            No addresses yet
          </Text>
          <Text className="text-text-secondary text-center mt-2">
            Add you first delivery address
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-2xl px-8 py-4 mt-6"
            activeOpacity={0.8}
            onPress={handleAddAddress}
          >
            <Text className="text-background font-bold text-base">
              Add Address
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
                isUpdatingAddress={isUpdatingAddress}
                isDeletingAddress={isDeletingAddress}
              />
            ))}
            <TouchableOpacity
              className="bg-primary items-center rounded-2xl py-4 mt-2"
              activeOpacity={0.8}
              onPress={handleAddAddress}
            >
              <View className="flex-row items-center">
                <Ionicons name="add-circle-outline" size={24} color="#121212" />
                <Text className="text-background font-bold text-base ml-2">
                  Add New Address
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <AddressFormModal
        visible={showAddressForm}
        // double bang operator
        isEditing={!!editingAddressId}
        addressForm={addressForm}
        isAddingAddress={isAddingAddress}
        isUpdatingAddress={isUpdatingAddress}
        onClose={handleCloseAddressForm}
        onSave={handleSaveAddress}
        onFormChange={setAddressForm}
      />
    </SafeScreen>
  );
};

export default AddressesScreen;

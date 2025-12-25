import { useApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types";
import { Alert } from "react-native";

const useWishlist = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await api.get<{ wishlist: Product[] }>(
        "/users/wishlist"
      );
      return data.wishlist;
    },
  });
  // the type according to the data from the api

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.post<{ wishlist: string[] }>(
        "/users/wishlist",
        { productId }
      );
      return data.wishlist;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    onError: (error) => {
      console.log("Failed to add to wishlist");
      Alert.alert("Error", `Failed to add to wishlist ${error}`);
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete<{ wishlist: string[] }>(
        `/users/wishlist/${productId}`
      );
      return data.wishlist;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    onError: (error) => {
      console.log("Failed to remove from wishlist");
      Alert.alert("Error", `Failed to remove from wishlist ${error}`);
    },
  });

  const isInWishlist = (productId: string) => {
    return wishlist?.some((product) => product._id === productId) ?? false;
  };

  const toggleWishlist = (productId: string) => {
    if (
      addToWishlistMutation.isPending ||
      removeFromWishlistMutation.isPending
    ) {
      return;
    }

    if (isInWishlist(productId)) {
      removeFromWishlistMutation.mutate(productId);
    } else {
      addToWishlistMutation.mutate(productId);
    }
  };

  return {
    toggleWishlist,
    isInWishlist,
    isLoading,
    wishlist: wishlist || [],
    isError,
    wishlistCount: wishlist?.length || 0,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    isAddingToWishlist: addToWishlistMutation.isPending,
  };
};

export default useWishlist;

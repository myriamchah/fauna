import { useToast as chakraUiToast } from "@chakra-ui/react";

const useToast = () => {
  const toast = chakraUiToast();

  return {
    showSuccess: (description) => {
      toast({
        title: "Yay!",
        description: description,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
    showError: (description) => {
      toast({
        title: "Nay!",
        description: description,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
    showWarning: (description) => {
      toast({
        title: "Oopsie!",
        description: description,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    },
  };
};

export default useToast;

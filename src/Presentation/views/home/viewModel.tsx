import { useState } from "react";
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";

 // Asegúrate de importar la API correctamente

const useViewModel = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const register = async () => {
    const userData = { name, lastname, phone, email, password };

    try {
      const response = await ApiDelivery.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    name,
    lastname,
    phone,
    email,
    password,
    confirmPassword,
    onChange,
    register,
  };
};

export default useViewModel;

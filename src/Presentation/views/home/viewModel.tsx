import { useState } from "react";

const useViewModel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  return {
    email,
    password,
    onChange,
  };
};

export default useViewModel;
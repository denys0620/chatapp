import React from "react";
import AuthForm from "../components/AuthForm";

interface AuthPageProps {
	setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthPage = ({ setUser }: AuthPageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthForm setUser={setUser} />
    </div>
  );
};

export default AuthPage;
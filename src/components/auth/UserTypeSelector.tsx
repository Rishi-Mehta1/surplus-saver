import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";

interface UserTypeSelectorProps {
  userType: "user" | "admin";
  onUserTypeChange: (type: "user" | "admin") => void;
}

const UserTypeSelector = ({ userType, onUserTypeChange }: UserTypeSelectorProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-card rounded-lg p-1 shadow-card">
        <Button
          variant={userType === "user" ? "default" : "ghost"}
          onClick={() => onUserTypeChange("user")}
          className="flex items-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>Customer</span>
        </Button>
        <Button
          variant={userType === "admin" ? "default" : "ghost"}
          onClick={() => onUserTypeChange("admin")}
          className="flex items-center space-x-2"
        >
          <Shield className="h-4 w-4" />
          <span>Admin</span>
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelector;
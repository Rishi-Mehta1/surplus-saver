import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthCardProps {
  userType: "user" | "admin";
  loading: boolean;
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string, fullName: string) => void;
}

const AuthCard = ({ userType, loading, onSignIn, onSignUp }: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          {userType === "admin" ? "Admin Portal" : "Walmart Surplus Saver"}
        </CardTitle>
        <CardDescription>
          {userType === "admin" 
            ? "Manage stores and surplus inventory" 
            : "Join us in fighting food waste while saving money"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignInForm onSubmit={onSignIn} loading={loading} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm onSubmit={onSignUp} loading={loading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
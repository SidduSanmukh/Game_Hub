import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { X, LogIn, UserPlus } from "lucide-react";

const Login = ({ onClose, onLogin }: { onClose: () => void; onLogin: (username: string) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        if (email && password) {
          toast({
            title: "🎉 Welcome Back!",
            description: "Successfully logged in to GameVerse!",
            duration: 3000,
          });
          onLogin(email);
          onClose();
        } else {
          toast({
            title: "❌ Login Failed",
            description: "Please fill in all fields.",
            duration: 3000,
          });
        }
      } else {
        if (email && password && confirmPassword) {
          if (password === confirmPassword) {
            toast({
              title: "🎉 Account Created!",
              description: "Welcome to GameVerse! You're now logged in.",
              duration: 3000,
            });
            onLogin(email);
            onClose();
          } else {
            toast({
              title: "❌ Passwords Don't Match",
              description: "Please make sure your passwords match.",
              duration: 3000,
            });
          }
        } else {
          toast({
            title: "❌ Registration Failed",
            description: "Please fill in all fields.",
            duration: 3000,
          });
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl neon-text">
              {isLogin ? 'Login' : 'Sign Up'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1"
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="mt-1"
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gaming-600 hover:bg-gaming-700"
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {isLogin ? <LogIn className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  {isLogin ? 'Login' : 'Sign Up'}
                </>
              )}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

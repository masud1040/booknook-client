"use client";

import Link from "next/link";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useState } from "react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/components/shared/GoogleIcon";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F4F7FB] px-4 py-12">
      <Card className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BookOpen size={23} />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Book<span className="text-blue-600">Nook</span>
            </span>
          </Link>

          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Welcome Back!
            </CardTitle>
            <CardDescription className="mt-2">
              Sign in to continue your reading journey.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl border-slate-300"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 rounded-xl pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="button"
              className="h-11 w-full rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-blue-600">
              Create Account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

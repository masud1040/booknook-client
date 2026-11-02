
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BookOpen, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email and Password Signup
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(user.password)) {
      toast.error(
        "Password must contain uppercase, lowercase and at least 6 characters."
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Account created successfully! Welcome to BookNook.");

        router.push("/");
        router.refresh();
        return;
      }

      toast.error("Registration response was empty. Please try again.");
    } catch (error: unknown) {
      console.error("Signup Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error: unknown) {
      console.error("Google Signup Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Google signup failed!";

      toast.error(message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">

        {/* BookNook Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BookOpen className="size-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            BookNook
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Your little corner of knowledge.
          </p>
        </div>

        {/* Signup Card */}
        <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-2 pb-4 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create Your Account
            </CardTitle>

            <CardDescription className="text-slate-500">
              Join BookNook and start your reading journey.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Google Signup */}
            <Button
              type="button"
              variant="outline"
              disabled={loading || googleLoading}
              onClick={handleGoogleSignUp}
              className="h-11 w-full gap-3 rounded-xl border-slate-300 bg-white font-medium text-slate-700 hover:bg-slate-50"
            >
              {googleLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <FcGoogle className="size-5" />
              )}

              {googleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}
            </Button>

            {/* Email Signup Form */}
            <form onSubmit={handleSignUp}>
              <FieldGroup>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white">
                  Or sign up with email
                </FieldSeparator>

                {/* Name */}
                <Field>
                  <FieldLabel htmlFor="name">
                    Full Name
                  </FieldLabel>

                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    disabled={loading || googleLoading}
                    className="h-11 rounded-xl"
                  />
                </Field>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">
                    Email Address
                  </FieldLabel>

                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={loading || googleLoading}
                    className="h-11 rounded-xl"
                  />
                </Field>

                {/* Profile Image */}
                <Field>
                  <FieldLabel htmlFor="image">
                    Profile Photo URL
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </FieldLabel>

                  <Input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/photo.jpg"
                    disabled={loading || googleLoading}
                    className="h-11 rounded-xl"
                  />
                </Field>

                {/* Password */}
                <Field>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    disabled={loading || googleLoading}
                    className="h-11 rounded-xl"
                  />

                  <FieldDescription className="text-xs">
                    Minimum 6 characters with uppercase and lowercase letters.
                  </FieldDescription>
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="mt-2 h-11 w-full rounded-xl bg-blue-600 font-semibold hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </FieldGroup>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="px-4 text-center text-xs leading-6 text-slate-400">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="underline hover:text-slate-600"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline hover:text-slate-600"
          >
            Privacy Policy
          </Link>.
        </p>

      </div>
    </div>
  );
}

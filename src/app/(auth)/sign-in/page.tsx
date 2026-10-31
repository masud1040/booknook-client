
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
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

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  const user = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };

  try {
    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (error) {
      toast.error(error.message || "Login failed!");
      return;
    }

    if (data) {
      toast.success("Login successful! Welcome back to BookNook.");

      router.push("/");
      router.refresh();
      return;
    }

    toast.error("Login response was empty. Please try again.");
  } catch (error: unknown) {
    console.error("Login Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    toast.error(message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto my-10 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to your BookNook account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Continue with email
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </Field>

              {errorMessage && (
                <p className="text-sm text-red-500">
                  {errorMessage}
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>.
      </FieldDescription>
    </div>
  );
}

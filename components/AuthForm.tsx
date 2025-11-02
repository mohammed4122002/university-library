"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";

import { singInSchema, singUpSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

const authSchemas = {
  SIGN_IN: singInSchema,
  SIGN_UP: singUpSchema,
} as const;

type AuthSchemas = typeof authSchemas;
type AuthType = keyof AuthSchemas;
type AuthFormValuesMap = {
  [K in AuthType]: z.infer<AuthSchemas[K]>;
};

type FieldConfig<T extends AuthType> = {
  name: keyof AuthFormValuesMap[T] & string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  autoComplete?: string;
};

const authDefaultValues: { [K in AuthType]: AuthFormValuesMap[K] } = {
  SIGN_IN: {
    email: "",
    password: "",
  },
  SIGN_UP: {
    fullName: "",
    email: "",
    password: "",
    universityId: 0,
    universityCard: "",
  },
};

const authFieldConfig: { [K in AuthType]: FieldConfig<K>[] } = {
  SIGN_IN: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      autoComplete: "current-password",
    },
  ],
  SIGN_UP: [
    {
      name: "fullName",
      label: "Full name",
      placeholder: "Enter your full name",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
      autoComplete: "new-password",
    },
    {
      name: "universityId",
      label: "University ID",
      type: "number",
      placeholder: "123456",
    },
    {
      name: "universityCard",
      label: "University card",
      placeholder: "Card number",
    },
  ],
};

const authCopy: {
  [K in AuthType]: { title: string; subtitle: string; cta: string };
} = {
  SIGN_IN: {
    title: "Welcome Back!",
    subtitle: "Sign in to access your account.",
    cta: "Sign In",
  },
  SIGN_UP: {
    title: "Create an Account",
    subtitle: "Join the university library community.",
    cta: "Sign Up",
  },
};

type AuthFormProps<T extends AuthType> = {
  type: T;
  defaultValues?: Partial<AuthFormValuesMap[T]>;
  onSubmit: (
    data: AuthFormValuesMap[T]
  ) => Promise<{ success: boolean; error?: string }>;
};

const AuthForm = <T extends AuthType>({
  type,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const schema = authSchemas[type];
  const resolvedDefaults = {
    ...authDefaultValues[type],
    ...defaultValues,
  } as AuthFormValuesMap[T];

  const form = useForm<AuthFormValuesMap[T]>({
    resolver: zodResolver(schema),
    defaultValues: resolvedDefaults,
  });

  const { title, subtitle, cta } = authCopy[type];
  const fields = authFieldConfig[type] as FieldConfig<T>[];

  const handleFormSubmit = async (data: AuthFormValuesMap[T]) => {
    console.log("Form Data:", data);
    
    await onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6 w-full"
        >
          {fields.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name as FieldPath<AuthFormValuesMap[T]>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {fieldConfig.label}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <div className="">
                        <span className="text-light-300">UNI-</span>
                      </div>
                    ) : (
                      <Input
                        type={fieldConfig.type ?? "text"}
                        placeholder={fieldConfig.placeholder}
                        autoComplete={fieldConfig.autoComplete}
                        {...field}
                        value={field.value ?? ""}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  {fieldConfig.description ? (
                    <FormDescription>{fieldConfig.description}</FormDescription>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="bg-primary text-dark-100 hover:bg-primary inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : cta}
          </Button>
        </form>
      </Form>

      {type === "SIGN_IN" ? (
        <Link href={"/sing-up"}>
          {" "}
          <p className="text-sm text-center text-light-300">
            Don't have an account?{" "}
            <span className="text-primary font-semibold">Sign Up</span>
          </p>
        </Link>
      ) : (
        <Link href={"/sing-in"}>
          <p className="text-sm text-center text-light-300"></p>
          Already have an account?{" "}
          <span className="text-primary font-semibold">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default AuthForm;

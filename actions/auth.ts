"use server";

import { registerUserService } from "@/lib/strapi";
import { FormState, signupSchema } from "@/validations/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 7 días
  path: "/",
  httpOnly: true, // Solo accesible por el servidor,
  domain: process.env.Host ?? "localhost",
  secure: process.env.NODE_ENV === "production", // Solo en producción
};

export async function registerUserAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // 2. Validamos con Zod
  const validateFields = signupSchema.safeParse(fields);

  if (!validateFields.success) {
    const flattenedErrors = z.flattenError(validateFields.error);
    return {
      success: false,
      message: "Validación fallida",
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
      strapiErrors: null,
    };
  }
  const response = await registerUserService(validateFields.data);

  if (!response || response.error) {
    return {
      success: false,
      message: "Registro fallido",
      zodErrors: null,
      data: fields,
      strapiErrors: response?.error,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, cookieConfig);
  redirect("/dashboard");
}

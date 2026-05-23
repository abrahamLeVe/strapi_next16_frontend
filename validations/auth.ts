import { z } from "zod";

// --- ESQUEMAS DE VALIDACIÓN ---

export const signupSchema = z.object({
  username: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Introduce un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
});

export const loginSchema = z.object({
  identifier: z
    .email({ message: "Debe ser un correo electrónico válido" })
    .or(z.string().min(3, "El nombre de usuario es demasiado corto")),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

// --- TIPOS DE INFERENCIA ---

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// --- TIPO FORMSTATE PARA SERVER ACTIONS ---

export type FormState = {
  success?: boolean;
  message?: string;

  data?: {
    username?: string;
    email?: string;
    password?: string;
  };
  // Errores específicos de la API de Strapi
  strapiErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  // Errores de validación de Zod mapeados por campo
  zodErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  } | null;
};

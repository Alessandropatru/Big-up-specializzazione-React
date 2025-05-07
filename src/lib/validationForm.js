import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
    "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

// Schema per la registrazione
export const FormSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(3),
    password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema.refine((data) => data);

// Schema per il login
export const FormSchemaLogin = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const ConfirmSchemaLogin = FormSchemaLogin.refine((data) => data);
export function getFieldError(property, value) {
    const shape = FormSchema instanceof z.ZodObject ? FormSchema.shape : null;

    if (!shape || typeof property !== "string" || !(property in shape)) {
        
        return undefined;
    }

    const { error } = shape[property].safeParse(value);
    return error
        ? error.issues.map((issue) => issue.message).join(", ")
        : undefined;
}



export const getErrors = (error) =>
    error.issues.reduce((all, issue) => {
        const path = issue.path.join("");
        const message = all[path] ? all[path] + ", " : "";
        all[path] = message + issue.message;
        return all;
    }, {});
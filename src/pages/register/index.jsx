import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";
import Toast from "../../components/Toast";  // Importa il Toast
import "../../components/css/register.css"; 

export default function RegisterPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const [toast, setToast] = useState({ message: "", type: "" }); // Aggiungi lo stato per il toast
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username,
                    },
                },
            });
            if (error) {
                setToast({ message: "Signing up error 👎🏻!", type: "error" });
            } else {
                setToast({ message: "Signed up 👍🏻!", type: "success" });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/"); // Redirect to the homepage or dashboard
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (
        <section className="register-page vh-100">
            <div className="register-container text-center">
                <form className="register-form" onSubmit={onSubmit} noValidate>
                    <label className="register-label mt-5" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`register-input ${formErrors.email ? "input-error" : ""}`}
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                        placeholder={formErrors.email || "Enter your email"}
                        aria-invalid={isInvalid("email")}
                        required
                    />
    
                    <label className="register-label" htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`register-input ${formErrors.firstName ? "input-error" : ""}`}
                        value={formState.firstName}
                        onChange={setField("firstName")}
                        onBlur={onBlur("firstName")}
                        placeholder={formErrors.firstName || "Enter your first name"}
                        aria-invalid={isInvalid("firstName")}
                        required
                    />
    
                    <label className="register-label" htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`register-input ${formErrors.lastName ? "input-error" : ""}`}
                        value={formState.lastName}
                        onChange={setField("lastName")}
                        onBlur={onBlur("lastName")}
                        placeholder={formErrors.lastName || "Enter your last name"}
                        aria-invalid={isInvalid("lastName")}
                        required
                    />
    
                    <label className="register-label" htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={`register-input ${formErrors.username ? "input-error" : ""}`}
                        value={formState.username}
                        onChange={setField("username")}
                        onBlur={onBlur("username")}
                        placeholder={formErrors.username || "Enter your username"}
                        aria-invalid={isInvalid("username")}
                        required
                    />
    
                    <label className="register-label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`register-input ${formErrors.password ? "input-error" : ""}`}
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                        placeholder={formErrors.password || "Enter your password"}
                        aria-invalid={isInvalid("password")}
                        required
                    />
    
                    <br />
                    <button className="register-button" type="submit">Sign Up</button>
                </form>
            </div>

            {/* Condizione per mostrare il toast */}
            {toast.message && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: "", type: "" })}
                />
            )}
        </section>
    );
}

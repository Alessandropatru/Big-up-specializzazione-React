import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  FormSchemaLogin,
  ConfirmSchemaLogin,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import Toast from "../../components/Toast"; // Assicurati di importare il componente Toast
import "../../components/css/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" }); // Stato del toast

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      console.log(data);
      let { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        showToast("Signing in error 👎🏻!", "error");
      } else {
        showToast("Signed In 👍🏻!", "success");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const showToast = (msg, type = "info") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000); // Rimuove il toast dopo 3 secondi
  };

  const onBlur = (property) => () => {
    const message = getFieldError(FormSchemaLogin, property, formState[property]);
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
    <section className="vh-100">
      <div className="container text-center">
        <form className="form-custom" onSubmit={onSubmit} noValidate>
          <label className="mt-5" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={setField("email")}
            onBlur={onBlur("email")}
            aria-invalid={isInvalid("email")}
            required
          />
          {formErrors.email && <small>{formErrors.email}</small>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={setField("password")}
            onBlur={onBlur("password")}
            aria-invalid={isInvalid("password")}
            required
          />
          {formErrors.password && <small>{formErrors.password}</small>}

          <br />
          <button
    className="btn-galaxy"
    type="submit"
    onClick={(e) => {
        const button = e.currentTarget;
        if (button) {
            button.classList.add("clicked");
            setTimeout(() => {
                button.classList.remove("clicked");
            }, 600);
        }
    }}
>
    <span>Sign In</span>
    <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>
        </form>

        {/* Mostra il Toast */}
        {toast.message && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: "", type: "" })}
          />
        )}
      </div>
    </section>
  );
}

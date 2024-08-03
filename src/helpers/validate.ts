import { ILoginError, ILoginProps, IRegisterError, IRegisterProps } from "@/interfaces/Types";

export function validateLoginForm(values: ILoginProps) {
    const errors: ILoginError = {}

    if (!values.email) {
        errors.email = "El campo de email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El email no tiene un formato válido.";
    }

    if (!values.password) {
        errors.password = "El campo de contraseña es obligatorio.";
    }

    return errors;
}

export function validateRegisterForm(values: IRegisterProps) {
    const errors: IRegisterError = {}

    if (!values.email) {
        errors.email = "El campo de email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El email no tiene un formato válido.";
    }

    if (!values.password) {
        errors.password = "El campo de contraseña es obligatorio.";
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!values.name) {
        errors.name = "El campo de nombre es obligatorio.";
    }

    if (!values.address) {
        errors.address = "El campo de dirección es obligatorio.";
    }

    if (!values.phone) {
        errors.phone = "El campo de teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "El teléfono debe tener 10 dígitos.";
    }

    return errors;
}

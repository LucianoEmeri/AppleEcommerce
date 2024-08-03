import { ILoginError, ILoginProps, IRegisterError, IRegisterProps } from "@/interfaces/Types";

export function validateLoginForm(values: ILoginProps): ILoginError {
    const errors: ILoginError = {};

    if (!values.email) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El correo electrónico no tiene un formato válido.";
    }

    if (!values.password) {
        errors.password = "La contraseña es obligatoria.";
    }

    return errors;
}

export function validateRegisterForm(values: IRegisterProps): IRegisterError {
    const errors: IRegisterError = {};

    if (!values.email) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El correo electrónico no tiene un formato válido.";
    }

    if (!values.password) {
        errors.password = "La contraseña es obligatoria.";
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!values.name) {
        errors.name = "El nombre es obligatorio.";
    }

    if (!values.address) {
        errors.address = "La dirección es obligatoria.";
    }

    if (!values.phone) {
        errors.phone = "El número de teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "El número de teléfono debe tener exactamente 10 dígitos.";
    }

    return errors;
}

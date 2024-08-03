import { ILoginProps, IRegisterProps, IUserSession } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json();
    } else {
        const errorText = await res.text();
        throw new Error(errorText || "Error en la solicitud");
    }
}

export async function register(userData: IRegisterProps): Promise<void> {
    try {
        const res = await fetch(`${APIURL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        await handleResponse(res);

    } catch (error: any) {
        console.error("Error al registrarse:", error.message);
        throw new Error("No se pudo completar el registro. Por favor, inténtalo de nuevo.");
    }
}

export async function login(userData: ILoginProps): Promise<IUserSession> {
    try {
        const res = await fetch(`${APIURL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        return handleResponse<IUserSession>(res);

    } catch (error: any) {
        console.error("Error al iniciar sesión:", error.message);
        throw new Error("No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.");
    }
}

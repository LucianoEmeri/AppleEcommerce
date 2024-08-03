const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(products: number[], token: string) {
    try {
        const res = await fetch(`${APIURL}/orders`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ products })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const orders = await res.json();
        return orders;
    } catch (error: any) {
        console.error('Error en createOrder:', error.message);
        throw new Error(error.message);
    }
}

export async function getOrders(token: string) {
    try {
        const res = await fetch(`${APIURL}/users/orders`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const orders = await res.json();
        return orders;
    } catch (error: any) {
        console.error('Error en getOrders:', error.message);
        throw new Error(error.message);
    }
}

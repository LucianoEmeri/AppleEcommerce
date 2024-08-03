import ICategory from '@/interfaces/ICategory';
import categoriesToPreload from '@/helpers/categories';

// Define the return type for the function
export const getCategories = async (): Promise<ICategory[]> => {
    // Simula una llamada a un backend o una base de datos
    // Reemplaza esta línea con la llamada real a tu API o servicio
    return new Promise<ICategory[]>((resolve) => {
        setTimeout(() => resolve(categoriesToPreload), 1000);
    });
};

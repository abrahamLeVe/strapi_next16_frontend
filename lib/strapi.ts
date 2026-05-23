import { cacheLife } from "next/cache";
import qs from "qs";

export const BASE_URL =
  process.env.STRAPI_BASE_URL || "https://secure-desk-ba9bf7e12c.strapiapp.com";

// Esta es la traducción exacta de tu URL a objeto JS
const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"], // Puedes especificar qué campos quieres de la imagen
            },
            link: {
              populate: true, // Especifica los campos que quieres del link
            },
          },
        },
      },
    },
  },
};

export async function getHomePageData() {
  "use cache";
  cacheLife({ expire: 60 }); // Cachea esta función por 60 segundos
  const queryString = qs.stringify(QUERY_HOME_PAGE, {
    encodeValuesOnly: true,
  });

  const response = await getStrapiData(`/api/home-page?${queryString}`);
  return response?.data;
}

export async function getStrapiData(endpoint: string) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from Strapi: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la petición a Strapi:", error);
    return null;
  }
}

export async function registerUserService(userData: object) {
  const url = `${BASE_URL}/api/auth/local/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la petición de registro:", error);
    throw error;
  }
}

export async function loginUserService(userData: object) {
  const url = `${BASE_URL}/api/auth/local`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la petición de inicio de sesión:", error);
    throw error;
  }
}

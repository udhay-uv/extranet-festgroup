// // export const BACKEND_URL="https://extranet-festgroup-backend.vercel.app"
//  export const BACKEND_URL="http://localhost:3000"

// config.ts

const isDev = import.meta.env.MODE === 'development';

export const BACKEND_URL = isDev
  ? "http://localhost:3000"
  : "https://extranet-festgroup-backend.vercel.app"






export const companyMap = {
    'a':{
        name: "Festa Solar",
        color: "blue",
        image:"a.png",
        favicon:"a_favicon.png"
    },
    "s": {  
        name: "Semicon",
        color: "blue",
        image:"s.png",
        favicon:"s_favicon.png"
    },
    "t": {
        name: "Feston",
        color: "blue",
        image:"t.png",
        favicon:"t_favicon.png"
    }
}

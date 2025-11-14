import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Route } from "@/pages/Index";
import bus13Image from "@/assets/bus-13.png";

const defaultRoutes: Route[] = [
  // Bus 13 - Morning routes (to Takshashila University)
  {
    id: "13",
    from: "Uppuvellore",
    to: "Takshashila University",
    time: "07:00 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 10,
    image: bus13Image,
    stops: ["Karattai", "Parangani", "Pudhur", "Peravoor", "Ulagapuram", "Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Karattai",
    to: "Takshashila University",
    time: "07:05 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 9,
    image: bus13Image,
    stops: ["Parangani", "Pudhur", "Peravoor", "Ulagapuram", "Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Parangani",
    to: "Takshashila University",
    time: "07:10 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 8,
    image: bus13Image,
    stops: ["Pudhur", "Peravoor", "Ulagapuram", "Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Pudhur",
    to: "Takshashila University",
    time: "07:15 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 7,
    image: bus13Image,
    stops: ["Peravoor", "Ulagapuram", "Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Peravoor",
    to: "Takshashila University",
    time: "07:20 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 6,
    image: bus13Image,
    stops: ["Ulagapuram", "Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Ulagapuram",
    to: "Takshashila University",
    time: "07:25 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 5,
    image: bus13Image,
    stops: ["Nallalam", "Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Nallalam",
    to: "Takshashila University",
    time: "07:30 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 4,
    image: bus13Image,
    stops: ["Perumukkal", "Housing Board"],
  },
  {
    id: "13",
    from: "Perumukkal",
    to: "Takshashila University",
    time: "07:35 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 3,
    image: bus13Image,
    stops: ["Housing Board"],
  },
  {
    id: "13",
    from: "Housing Board",
    to: "Takshashila University",
    time: "07:40 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 2,
    image: bus13Image,
    stops: [],
  },
  // Bus 13 - Evening routes (from Takshashila University)
  {
    id: "13",
    from: "Takshashila University",
    to: "Uppuvellore",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 10,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam", "Ulagapuram", "Peravoor", "Pudhur", "Parangani", "Karattai"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Karattai",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 9,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam", "Ulagapuram", "Peravoor", "Pudhur", "Parangani"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Parangani",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 8,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam", "Ulagapuram", "Peravoor", "Pudhur"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Pudhur",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 7,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam", "Ulagapuram", "Peravoor"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Peravoor",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 6,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam", "Ulagapuram"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Ulagapuram",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 5,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal", "Nallalam"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Nallalam",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 4,
    image: bus13Image,
    stops: ["Housing Board", "Perumukkal"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Perumukkal",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 3,
    image: bus13Image,
    stops: ["Housing Board"],
  },
  {
    id: "13",
    from: "Takshashila University",
    to: "Housing Board",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 2,
    image: bus13Image,
    stops: [],
  },
];

type RoutesContextType = {
  routes: Route[];
  addRoute: (route: Route) => void;
  updateRoute: (index: number, route: Route) => void;
  deleteRoute: (index: number) => void;
};

const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

export const RoutesProvider = ({ children }: { children: ReactNode }) => {
  const [routes, setRoutes] = useState<Route[]>(() => {
    const saved = localStorage.getItem("busRoutes");
    return saved ? JSON.parse(saved) : defaultRoutes;
  });

  useEffect(() => {
    localStorage.setItem("busRoutes", JSON.stringify(routes));
  }, [routes]);

  const addRoute = (route: Route) => {
    setRoutes([...routes, route]);
  };

  const updateRoute = (index: number, route: Route) => {
    const updated = [...routes];
    updated[index] = route;
    setRoutes(updated);
  };

  const deleteRoute = (index: number) => {
    setRoutes(routes.filter((_, i) => i !== index));
  };

  return (
    <RoutesContext.Provider value={{ routes, addRoute, updateRoute, deleteRoute }}>
      {children}
    </RoutesContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error("useRoutes must be used within RoutesProvider");
  }
  return context;
};

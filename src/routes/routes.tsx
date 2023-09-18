import {createBrowserRouter} from "react-router-dom";
import CoinList from "../components/Coins/CoinList";
import CoinInfo from "../components/Coins/CoinInfo";



const router = createBrowserRouter([
    {
        path: "/",
        element: <CoinList/>,

    },

    {
        path: "coins/:coinId",
        element: <CoinInfo />,
    },
]);

export default router;

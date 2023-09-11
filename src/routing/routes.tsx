import {
    createBrowserRouter,

} from "react-router-dom";
import CoinList from "../components/CoinList";
import CoinInfo from "../components/CoinInfo";




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

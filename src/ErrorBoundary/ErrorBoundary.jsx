import { useRouteError } from "react-router-dom";


export default function ErrorBoundary()
{
    const error=useRouteError();
    console.log(error)
    return(
        <center>
            <h1>{error.status}</h1>
            <h2>{"Page "+error.statusText}</h2>
        </center>
    )
}
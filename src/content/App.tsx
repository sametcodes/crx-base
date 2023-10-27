import React, { useEffect } from "react"
import { useContainer } from "@/content/context";

const App = () => {
    const { container } = useContainer();

    useEffect(() => {
        console.log(container)
    }, [])

    return <div>

    </div>
}

export default App;
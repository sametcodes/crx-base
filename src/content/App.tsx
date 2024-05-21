import React, { useEffect } from "react"
import { useContainer } from "@/lib/crx-base/context";

const App = () => {
    const { container } = useContainer();

    useEffect(() => {
        console.log(container)
    }, [])

    return <div>

    </div>
}

export default App;
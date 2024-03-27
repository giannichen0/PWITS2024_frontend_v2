import { useState, createContext, useEffect} from "react";

const IsMobileContext = createContext({})

export const IsMobileProvider = ({children})=>{
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("only screen and (max-width: 768px)");

        
        // Function to update isMobile state based on the media query
        const updateIsMobile = () => {
            setIsMobile(mediaQuery.matches);
        };

        
        updateIsMobile();

        
        const resizeListener = () => {
            updateIsMobile();
        };
        window.addEventListener("resize", resizeListener);

        
        return () => {
            window.removeEventListener("resize", resizeListener);
            console.log(mediaQuery.matches)
        };

    }, []); 


    return <IsMobileContext.Provider value={{isMobile, setIsMobile}}>
        {children}
    </IsMobileContext.Provider>
}

export default IsMobileContext
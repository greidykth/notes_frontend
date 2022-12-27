import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, callback, dataCallback=true) => {
        setIsLoading(true);
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });
            const data = await response.json();
            
            if (data.error) {
                throw data;
            }else{
                if(dataCallback){
                    callback(data);
                }else{
                    callback();
                }
            }
        } catch (err) {
            console.log(err);
            err.message ? setError(err.message) : 
            err.title ? setError(err.title) : 
            setError(err.error);
        }
        setIsLoading(false);
        setIsSaving(false);

    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        isSaving
    }
}

export {useHttp};

export const callApi = async (url: string, data: any, method: string, action: string): Promise<any> => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        throw new Error(`Error occurred with the ${action} endpoint`);
    }    
}
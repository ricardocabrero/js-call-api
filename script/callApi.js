const callApiFetch = async(url) => {
    try {
        const res = await fetch(`${url}`);
        if(res.ok) { 
            return await res.json();    
            } else {
                throw new Error('error fetch', res.statusText);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log('call api fetch finally');
        }
}

const callApiPost = async(url, data) => {
    try {
        const res = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json; charset=UTF-8' 
            }
        });
            if(res.ok) { 
                return await res.json();    
            } else {
                throw new Error('error post', res.statusText);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            console.log('call api post finally');
        }
}

export {
    callApiFetch as default,
    callApiPost,
}



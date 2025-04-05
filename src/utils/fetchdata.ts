export async function fetchData(url : String, method: String, body? : Object, params? : Object)
{
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "*");

    for (let p in params)
    {
        headers.append(p, params[p]);
    }

    return await fetch(url, {
        headers: headers,
        method: method,
        body : JSON.stringify(body)
        })
        .then((r) => {return r.json()})
        .catch((e) => {return e});
    
}
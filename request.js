const key = '287e5f1846e9d20cec24d3f5ab928403';

// const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=287e5f1846e9d20cec24d3f5ab928403';

// fetch(baseURL)
//     .then((data) => { 
//         console.log('response', data.json()) })
//     .catch((error) => {
//         console.log(error);
//     });

const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL+query);

    //promise data
    const data = await response.json();
    return data;
}

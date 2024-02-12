import ky from 'ky';

// Quote API Call
export const fetchQuote = async () => {
  const url = 'https://famous-quotes4.p.rapidapi.com/random?category=computers';
  try {
    const response = await ky.get(url, {
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_QUOTEAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_QUOTEAPI_HOST
      }
    }).json();
    return response[0];
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      throw new Error('No quotes found');
    } else {
      throw new Error('Quotes temporarily unavailable');
    }
  }
}

// Geo API Call
export const fetchGeo = async () => {
  const url = 'https://ip-geo-location.p.rapidapi.com/ip/check';
  try {
    const response = await ky.get(url, {
      params: { format: 'json' },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_GEOAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_GEOAPI_HOST,
      }
    }).json();
    return response;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      throw new Error('No geo information found');
    } else {
      throw new Error('Geo information temporarily unavailable');
    }
  }
}

// World API Call
export const fetchTime = async () => {
  const url = `http://worldtimeapi.org/api/ip/`;
  try {
    const response = await ky.get(url).json();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      throw new Error('Clock not found');
    } else {
      throw new Error('Clock temporarily unavailable');
    }
  }
}


import axios from 'axios'
export default {
    getData: () =>
        axios({
            'method': 'GET',
            'url': 'https://moviesdatabase.p.rapidapi.com/titles/%7Bid%7D',
            'headers': {
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                'X-RapidAPI-Key': '24f49d4fa7msh278ae79fbd55c50p158412jsnd5d3fe417b9d'
            },
            'params': {
                'search': 'parameter',
            },
        })
}


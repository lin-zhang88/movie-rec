export default NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
			start_year: null,
            end_year: null,
			genre: '',
            runtime: null,
            language: '',
            mood: '', 
            errorMessage: '',
            poster: '',
            page:'1'
		}

    }

    render(){
        const options = {
            method: 'GET',
            url: 'https://moviesdatabase.p.rapidapi.com/titles',
            params: {
              genre: genre,
              startYear: start_year,
              sort: 'year.incr',
              page: page,
              info: 'base_info',
              endYear: end_year,
              limit: '50'
            },
            headers: {
              'X-RapidAPI-Key': '2e6b38c860mshb732a7155bf7869p12e5a5jsnf4d9e954641e',
              'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
          };
          const result_id ={
            '0':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
            }
            '1':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
                }
            '2':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
            }
            '3':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
                }
            '4':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
            }
            '5':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
                }
            '6':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
            }
            '7':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
                }
            '8':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':''
            }
            '9':{
                'title': '',
                'ratingsSummary': {aggregateRating: '', voteCount: ''},
                'genres': { '0': genre, '1': genreTwo},
                'releaseDate': {'month':'', 'date':'', 'year' : ''},
                'runtime': '',
                'description':'',
                'language':'',
                'poster':{width:'',height: '', jpg_url: ''}
                }
            }

          try {
            const response = await axios.request(options);
            for(let i=0; i<response.data.results.length; i++){
                result_id[i][title]=response[data][results][i][originalTitleText][text];
                result_id[i][ratingsSummary][aggregateRating]=response[data][results][i][ratingsSummary][aggregateRating];
                result_id[i][ratingsSummary][voteCount]=response[data][results][i][ratingsSummary][voteCount];
                result_id[i][genres][0]=response[data][results][i][genre][genres][0][id];
                if(response[data][results][i][genre][genres][1][id]!=null){
                    result_id[i][genres][1]=response[data][results][i][genre][genres][1][id];
                }
                result_id[i][releaseDate][month]=response[data][results][i][releaseDate][month];
                result_id[i][releaseDate][date]=response[data][results][i][releaseDate][day];
                result_id[i][releaseDate][year]=response[data][results][i][releaseDate][year];
                result_id[i][runtime]=((response[data][results][i][runtime][seconds])/3600).toFixed(2);
                result_id[i][description]=response[data][results][i][plot][plotText][plainText];
                result_id[i][language]=response[data][results][i][plot][language][id];
                result_id[i][poster][width]=response[data][results][i][primaryImage][width];
                result_id[i][poster][height]=response[data][results][i][primaryImage][height];
                result_id[i][poster][jpg_url]=response[data][results][i][primaryImage][jpg_url];
                //need to set restrictions where filter the runtime&language&
                //result_id's purpose is to easy access the final result that can be utilitze in the frontend
                //maybe change the reult_id into an array instead?
                //may need quotes around the content in brackets
                
            };

            //console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        


};



(function (window, Handlebars) {

  const imageUrl = 'https://image.tmdb.org/t/p/w500';
  const data = window.getTvData.map(item => {
         return {
            title: item.name,
            imgUrl: imageUrl + item.poster_path,
            votes: item.vote_count,
            stars: item.vote_average,
            date: item.first_air_date
        }
    });

    const dataParse = (arr, key) =>  arr.sort((a,b) => a[key] < b[key] ? 1 : -1).slice(0, 6);
    const blocks = [
        {blockName: 'New movies', movies: dataParse(data, 'date')},
        {blockName: 'Top rated', movies: dataParse(data, 'stars')},
        {blockName: 'Most voted', movies: dataParse(data, 'votes')},
      ];



    Handlebars.registerHelper('newStars', function(options) {
    return new Handlebars.SafeString(
        `<div class="stars-in stars-`
        + (options.fn(this) / 2).toFixed(0)
        + `"></div>`);
});
    Handlebars.registerPartial('movie', Handlebars.templates.movie);
    Handlebars.registerPartial('moviesBlock', Handlebars.templates.moviesBlock);

    const html = Handlebars.templates['content']({ arr: blocks });
    document.getElementById('content').innerHTML = html;

})(window, Handlebars);

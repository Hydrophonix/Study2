(function(window, Handlebars) {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  const data = window.getMovieData.map(item => ({
    title: item.title,
    poster: IMG_URL + item.poster_path,
    votes: item.vote_average,
    date: item.release_date,
    overview: item.overview
  }));

  let type = false;

  const stripedTablesFunc = () => {
    if (type) {
      type = false;
      return "odd";
    }
    type = true;
    return "even";
  }

  Handlebars.registerHelper('tableHelper', function(options) {
    return options.data.root.reduce((gStr, item) => {
      return gStr += `
          <tr class="${stripedTablesFunc()}">
            <td><img src="${item.poster}" alt="${item.title}"/></td>
            <td>${item.title}</td>
            <td>${item.votes}</td>
            <td>${item.date}</td>
            <td>${item.overview}</td>
          </tr>`
    }, '')
  });

  const html = Handlebars.templates.table(data);
  document.getElementById('content').innerHTML = html;
})(window, Handlebars);

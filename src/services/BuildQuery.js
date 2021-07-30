// Превращаем объект в query params string,
// (все не truthy свойства, кроме 0 - пропускаем)
function buildQuery(params) {
  let queryParams = [];
  Object.keys(params).forEach(key => {
    if(params[key] || params[key] === 0) {
      queryParams.push(`${key}=${params[key]}`);
    }
  });

  if(queryParams.length > 0) {
    return '?' + queryParams.join('&');
  
  } else return '';
}

export default buildQuery;
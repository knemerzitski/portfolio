function objectToQueryString(queryObj) {
  var strArr = [];
  for (var key in queryObj) {
    var value = queryObj[key].value;
    if (value == '') {
      strArr.push(encodeURIComponent(key));
    } else {
      strArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  return strArr.join('&');
}

function objectToFullQueryString(queryObj){
  return Object.keys(queryObj).length > 0 ? `?${objectToQueryString(queryObj)}` : '';
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host.value;

  // Redirect aliases to main domain
  var expectedHost = 'export.knemerzitski.com';
  if (host !== expectedHost) {
    var query = objectToFullQueryString(request.querystring);

    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: `https://${expectedHost}${uri}${query}` }
      }
    };
  }

  // Enforce no trailing slash except root /
  if (uri.endsWith('/') && uri.length > 1) {
    uri = uri.replace(/(\/)+$/, '');
    if (!uri) {
      uri = '/';
    }

    var query = objectToFullQueryString(request.querystring);

    return {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: {
        'location': { value: `${uri}${query}` }
      }
    };
  }

  if (uri.endsWith('.webp')) {
    // Rewrite .webp to .jpg if browser doesn't support image/webp
    var accept = request.headers.accept.value;
    if (!accept.includes('image/webp')) {
      request.uri = `${uri.slice(0, -5)}.jpg`;
    }
  } else if (uri.endsWith('.html')) {
    // .html pages return 404
    request.uri = `/404.html`;
  } else if (!uri.includes('.') && uri !== '/') {
    // Append .html on request, except root /
    request.uri = `${uri}.html`;
  }

  return request;
}
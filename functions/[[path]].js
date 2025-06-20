export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const substackURL = `https://techfoundry1.substack.com${url.pathname}${url.search}`;

  const response = await fetch(substackURL, {
    method: request.method,
    headers: request.headers,
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.delete("content-security-policy");

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}

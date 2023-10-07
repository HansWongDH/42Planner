export default async function callAPI(
  method: string,
  route: string,
  access_token: string,
  messageBody?: any
): Promise<any> {
  console.log("accesstoken :", access_token);
  const domain = "https://api.intra.42.fr/v2/";
  const response = await fetch(domain + route, {
    method: method,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageBody),
  });
  const bodyText = await response.text();
  const body = bodyText ? JSON.parse(bodyText) : bodyText;

  if (!response.ok) {
    console.log(body);
  }
  return {
    status: response.status,
    body: response.ok ? body : null,
  };
}

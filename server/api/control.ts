import fetch from 'node-fetch';
import https from 'https';

export default defineEventHandler(async (event) =>{
  const {
    command,
    val,
    ip,
  } = await readBody(event)
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append(command, val);

  try {
    const response = await fetch(`http://${ip}/form/control_cgi`, {
      method: 'POST',
      headers,
      body: urlencoded,
      redirect: 'follow',
      insecureHTTPParser: false,
    });
    return (await response.text()).includes('pw:"1"');
  } catch (err) {
    if ((err as any)?.cause?.data) {
      const data = (err as any)?.cause.data;
      return data.includes('pw:"1"');
    }
    throw err;
  }
});
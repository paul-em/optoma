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

  const response = await fetch(`http://${ip}/form/control_cgi`, {
    method: 'POST',
    headers,
    body: urlencoded,
    redirect: 'follow',
    insecureHTTPParser: false,
  });
  const raw = await response.text();
  var data = JSON.parse(raw
    .replace('<html>', '')
    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
  return data;
});
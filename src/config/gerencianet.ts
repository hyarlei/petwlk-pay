import Gerencianet from "gn-api-sdk-typescript";
require("dotenv").config();

const gerenciaNet = new Gerencianet({
  sandbox: false,
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  certificate: process.env.CERTIFICATE,
});

export default gerenciaNet;

import { Request, Response } from "express";
import { getDatabase, ref, set } from "firebase/database";

import gerenciaNet from "../config/gerencianet";

interface PaymentData {
  txid: string;
  devedor: {
    cpf: string;
    nome: string;
  };
  valor: {
    original: string;
  };
}

const PixController = {
  async create(req: Request, res: Response) {
    const { paymentData } = req.body;
    console.log(paymentData);
    try {
      const pix = await criarCobrancaImediata(paymentData);
      if (pix.erros) {
        throw pix.erros;
      }
      const qr = await gerarQRCode(pix.loc.id);
      return res.status(200).send({ pix, qr });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
  async consult(req: Request, res: Response) {
    const { txid } = req.query;
    try {
      const pix = await consultarCobrancaImediata(txid as string);
      //atualizarStatusNoFireBase(pix);
      const qr = await gerarQRCode(pix.loc.id);
      return res.status(200).send({ pix, qr });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
};

async function criarCobrancaImediata(paymentData: PaymentData) {
  const { txid, devedor, valor } = paymentData;
  const params = {
    txid: txid,
  };
  const body = {
    devedor,
    valor,
    chave: "f2697c9a-5a5b-4288-99c7-56b586c2a7e6",
    calendario: {
      expiracao: 3600,
    },
  };
  try {
    return await gerenciaNet.pixCreateImmediateCharge(params, body);
  } catch (error) {
    return error;
  }
}

async function gerarQRCode(locId: string) {
  const params = {
    id: locId,
  };
  try {
    return await gerenciaNet.pixGenerateQRCode(params);
  } catch (error) {
    return error;
  }
}

async function consultarCobrancaImediata(txid: string) {
  const params = {
    txid,
  };
  try {
    return await gerenciaNet.pixDetailCharge(params);
  } catch (error) {
    return error;
  }
}

async function atualizarStatusNoFireBase(pix: {
  txid: string;
  status: string;
}) {
  try {
    const db = getDatabase();
    await set(ref(db, pix.txid as string), {
      status: pix.status,
    });
    return;
  } catch (error) {
    return error;
  }
}

export default PixController;

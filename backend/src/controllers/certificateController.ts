import { Request, Response } from 'express';
import { Certificate } from '../models/Certificate';

export const getAllCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};

export const getCertificateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const certId = req.params.certId as string;
    const cert = await Certificate.findOne({ id: certId });
    if (!cert) {
      res.status(404).json({ error: 'Certificate credential not found' });
      return;
    }
    res.status(200).json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
};

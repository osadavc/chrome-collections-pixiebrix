import { VercelApiHandler } from "@vercel/node";
import { allowCors } from "../../src/utils/cors";
import prisma from "../../src/utils/prisma";

const handler: VercelApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      try {
        const { collectionName } = req.query as {
          collectionName: string;
        };
        const { imgSrc, link, selection } = req.body as {
          imgSrc?: string;
          link?: string;
          selection?: string;
        };

        const result = await prisma.item.create({
          data: {
            collectionsName: collectionName,
            text: selection ? selection : null,
            link: link ? link : null,
            image: imgSrc ? imgSrc : null,
          },
        });

        return res.status(200).json({ status: 200, data: result });
      } catch (error: any) {
        return res.status(500).json({ status: 500, error: error.message });
      }
    }
  }
};

export default allowCors(handler);

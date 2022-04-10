import { VercelApiHandler } from "@vercel/node";
import { allowCors } from "../../src/utils/cors";
import prisma from "../../src/utils/prisma";

const handler: VercelApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        const result = await prisma.collections.findMany({
          include: {
            items: true,
          },
        });

        return res
          .status(200)
          .json({
            status: 200,
            data: result,
            dropDownData: result.map((item) => item.name),
          });
      } catch (error: any) {
        return res.status(500).json({ status: 500, error: error.message });
      }
    }

    case "POST": {
      try {
        const { name, description } = req.body as {
          name: string;
          description: string;
        };

        console.log(name);

        const result = await prisma.collections.create({
          data: {
            name,
            description,
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

import type {NextApiRequest, NextApiResponse} from "next";


const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json("test");
};

export default examples;

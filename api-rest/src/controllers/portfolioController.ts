import { Request, Response } from 'express';

const portfolios = [
  { id: 1, title: "Portfolio One", description: "My first portfolio", link: "#" },
  { id: 2, title: "Portfolio Two", description: "Another portfolio", link: "#" }
];

export const getPortfolios = (req: Request, res: Response) => {
  res.json(portfolios);
};

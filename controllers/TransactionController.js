const { Transaction, Detail_Transaction, comic } = require("../models");
const { getUserByToken } = require("../helper/auth");
const transaction = require("../models/transaction");
class TransactionController {
  static async create(req, res) {
    const user = await getUserByToken(req);
    try {
      const { total, carts } = req.body;
      const transaction = await Transaction.create({
        userId: user.id,
        isPayed: false,
        total: total,
      });
      // foreach carts [idCrat, idCart]
      // create DetailTramsaction  -> idComic, qty
      // end foreach
      carts.forEach(async (element) => {
        const detail = await Detail_Transaction.create({
          comicId: element.comics.id,
          quantity: element.quantity,
          transactionId: transaction.id,
        });
      });
      console.log(carts);
      res.status(200).json(transaction);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  static async getDetail(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const result = await Detail_Transaction.findAll({
        where: { transactionId: id },
        include: [{ model: comic }, { model: Transaction }],
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  }
  static async get(req, res) {
    const user = await getUserByToken(req);
    try {
      const result = await Transaction.findAll({ where: { userId: user.id } });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async edit(req, res) {
    const { id } = req.params;
    const { isPayed } = req.body;
    try {
      const result = await Transaction.findByPk(id);
      await result.update({ isPayed: isPayed });
      result == 1
        ? res.json({ message: `id ${id} has been updated` })
        : res.json({ message: `id ${id} is not found` });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = TransactionController;

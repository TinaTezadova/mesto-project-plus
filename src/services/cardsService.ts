import { ObjectId } from 'mongoose';
import { ICustomRequest } from 'types';
import { IUser } from '../models/user';
import Card from '../models/card';
import { findByIdAndUpdateParams } from '../consts';

class CardsService {
  getCards() {
    return Card.find({})
  }

  getCard(id: string) {
    return Card.findById(id).populate<{ owner: IUser, likes: IUser }>(['owner', 'likes']);
  }

  createCard(req: ICustomRequest) {
    const userId = req?.user?._id;
    return Card.create({ ...req.body, owner: userId });
  }

  deleteCard(id: string) {
    return Card.findByIdAndDelete(id);
  }

  likeCard(cardId: string, userId: ObjectId) {
    return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, findByIdAndUpdateParams)
      .populate<{ owner: IUser, likes: IUser }>(['owner', 'likes']);
  }

  dislikeCard(cardId: string, userId: ObjectId) {
    return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, findByIdAndUpdateParams)
      .populate<{ owner: IUser, likes: IUser }>(['owner', 'likes']);
  }
}

export default CardsService
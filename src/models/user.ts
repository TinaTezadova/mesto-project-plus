import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

type TUserDocument = IUser & Document;
interface IUserModel extends Model<TUserDocument> {
  findUserByCredentials: (email: string, password: string) => Promise<TUserDocument>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [ isURL, 'invalid url' ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [ isEmail, 'invalid email' ]
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});


userSchema.statics.findUserByCredentials =  function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }

          return user;
        });
    });
}



export default model<TUserDocument, IUserModel>('user', userSchema);
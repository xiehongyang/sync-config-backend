


export interface UserModel extends Document  {

  googleId: string;
  email: string;

  picture?: string;


  createdAt: Date;
  updatedAt: Date;

}
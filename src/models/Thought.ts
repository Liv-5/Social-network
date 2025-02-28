import { Schema, model, type Document } from "mongoose";

interface IReactions extends Document {
  reactionBody: string;
  createdAt: Date;
  username: string;
}

const reactionsSchema = new Schema<IReactions>(
  {
    reactionBody: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //need a getter mehtod to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

interface IThoughts extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const thoughtsSchema = new Schema<IThoughts>(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //need a getter mehtod to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

const Thoughts = model("Thoughts", thoughtsSchema);

export default Thoughts;

import { Schema, model, type Document } from "mongoose";

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
    reactions: [reactionSchema],
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

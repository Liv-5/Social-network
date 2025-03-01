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

      //need a getter method to format the timestamp on query
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
    id: false,
  }
);

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const thoughtSchema = new Schema<IThought>(
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
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

export default Thought;

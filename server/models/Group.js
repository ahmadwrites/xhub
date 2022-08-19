import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default:
        "https://cdn-almjc.nitrocdn.com/aZYyrACOqPKwqacflNAAVPArFRYGkpZe/assets/static/optimized/rev-76f8472/wp-content/uploads/2020/04/cf9454b37cc7e5f84574664014dab9a7.Xiamen-University-scaled.jpg",
    },
    subscriebdUsers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);

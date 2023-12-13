
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating:{
      rating:Number,
      count: Number
    },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    category: { type: [String], required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
      required: true,
    },
    reviews: { type: Number, required: false },
    published: { type: Boolean },
    whatYouWillLearn: { type: [String] },
    videoSection: [
      {
        title: String,
        videoUrl: String,
      },
    ],
  }, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
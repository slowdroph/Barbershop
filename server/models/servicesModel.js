import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A service must have a name"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "A service must have a description"],
    },
    price: {
        type: Number,
        required: [true, "A service must have a price"],
    },
});

const Service = mongoose.model("Service", servicesSchema);

export default Service;

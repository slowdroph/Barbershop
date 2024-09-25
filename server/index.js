import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";
// import cron from "node-cron";
// import Schedule from "./models/schedulesModel.js";
// import User from "./models/userModel.js";

mongoose.connect(process.env.MONGODB_CONNECT_URI).then(() => {
    console.log("DB connection successful!");
});

// cron.schedule("*/30 * * * *", async () => {
//     try {
//         const now = new Date();
//         const schedules = await Schedule.find({ scheduledDate: { $lte: now } });

//         for (const schedule of schedules) {
//             await Schedule.findByIdAndDelete(schedule._id);

//             await User.findByIdAndUpdate(schedule.user, {
//                 $pull: { schedules: schedule._id },
//             });

//             console.log(`Agendamento ${schedule._id} removido.`);
//         }
//     } catch (err) {
//         console.error("Erro ao executar o cron job:", err.message);
//     }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});

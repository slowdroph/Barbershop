import Schedule from "./../models/schedulesModel.js";
import User from "../models/userModel.js";

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate("user", "name")
            .populate("service", "name")
            .sort({ scheduledDate: 1 });

        res.status(200).json({
            status: "success",
            results: schedules.length,
            data: {
                schedules,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const getUserSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({ user: req.user._id })
            .populate("user", "name")
            .populate("service", "name");

        res.status(200).json({
            status: "success",
            results: schedules.length,
            data: {
                schedules,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

export async function createSchedule(req, res) {
    try {
        const { scheduledDate, serviceId } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (user.schedules.length >= 3) {
            return res.status(400).json({
                status: "fail",
                message:
                    "Você já possui 3 agendamentos. Exclua um para criar outro.",
            });
        }

        const newSchedule = await Schedule.create({
            scheduledDate,
            user: userId,
            service: serviceId,
        });

        user.schedules.push(newSchedule._id);
        await user.save({ validateBeforeSave: false });

        res.status(201).json({
            status: "success",
            data: {
                schedule: newSchedule,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map((el) => el.message);
            return res.status(400).json({
                status: "fail",
                message: errors.join(" "),
            });
        }

        res.status(500).json({
            status: "error",
            message: "Erro no servidor. Por favor, tente novamente mais tarde.",
        });
    }
}

export const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!schedule) {
            return res.status(404).json({
                status: "fail",
                message:
                    "Nenhum agendamento encontrado com esse ID para o usuário atual",
            });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { schedules: req.params.id },
        });

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const handler = async (req, res) => {
    try {
        const now = new Date();
        const schedules = await Schedule.find({ scheduledDate: { $lte: now } });

        for (const schedule of schedules) {
            await Schedule.findByIdAndDelete(schedule._id);
            await User.findByIdAndUpdate(schedule.user, {
                $pull: { schedules: schedule._id },
            });

            console.log(`Agendamento ${schedule._id} removido.`);
        }

        return res
            .status(200)
            .json({ message: "Expired schedules cleaned up." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to clean up schedules." });
    }
};

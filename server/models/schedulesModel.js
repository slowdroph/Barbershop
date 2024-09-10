import mongoose from "mongoose";

const schedulesSchema = new mongoose.Schema({
    scheduledDate: {
        type: Date,
        required: [true, "A data de agendamento é obrigatória."],
        validate: [
            {
                validator: function (value) {
                    const currentDate = new Date();
                    const maxDate = new Date(currentDate);
                    maxDate.setDate(currentDate.getDate() + 3);

                    return value >= currentDate && value <= maxDate;
                },
                message:
                    "A data de agendamento deve estar dentro de 3 dias a partir da data atual.",
            },
            {
                validator: function (value) {
                    const dayOfWeek = value.getDay();
                    return dayOfWeek !== 0;
                },
                message: "Agendamentos não são permitidos aos domingos.",
            },
            {
                validator: function (value) {
                    const hours = value.getHours();
                    const minutes = value.getMinutes();
                    const isWithinWorkingHours =
                        hours >= 8 &&
                        (hours < 17 || (hours === 17 && minutes === 0));

                    return isWithinWorkingHours;
                },
                message:
                    "O horário de agendamento deve ser entre 08:00 e 17:00.",
            },
            {
                validator: function (value) {
                    const minutes = value.getMinutes();
                    return minutes === 0 || minutes === 30;
                },
                message:
                    "O horário de agendamento deve ser em intervalos de 30 minutos.",
            },
            {
                validator: async function (value) {
                    const existingSchedule =
                        await mongoose.models.Schedule.findOne({
                            scheduledDate: value,
                        });
                    return !existingSchedule;
                },
                message:
                    "Já existe um agendamento para essa data e horário. Por favor, escolha outro horário.",
            },
        ],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Um agendamento deve pertencer a um usuário."],
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: [true, "Um agendamento deve incluir um serviço."],
    },
});

const Schedule = mongoose.model("Schedule", schedulesSchema);

export default Schedule;

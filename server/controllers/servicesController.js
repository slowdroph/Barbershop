import Service from "./../models/servicesModel.js";

export async function getAllServices(req, res) {
    const services = await Service.find(req.query);

    res.status(200).json({
        status: "success",
        data: {
            services,
        },
    });
}

export async function createService(req, res) {
    const newService = await Service.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            tour: newService,
        },
    });
}

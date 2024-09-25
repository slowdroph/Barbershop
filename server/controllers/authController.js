import User from "./../models/userModel.js";
import Schedule from "./../models/schedulesModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export async function signup(req, res) {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            const message = `${
                field.charAt(0).toUpperCase() + field.slice(1)
            } já cadastrado`;

            return res.status(400).json({
                status: "fail",
                errors: [
                    {
                        field,
                        message,
                    },
                ],
            });
        }

        if (err.name === "ValidationError") {
            const errors = Object.keys(err.errors).map((field) => {
                return {
                    field,
                    message: err.errors[field].message,
                };
            });

            return res.status(400).json({
                status: "fail",
                errors,
            });
        }

        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            errors: [
                {
                    field: "email",
                    message: "Por favor, forneça email e senha",
                },
            ],
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: "fail",
            errors: [
                {
                    field: "email",
                    message: "Email ou senha incorretos",
                },
            ],
        });
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        },
    });
}

export async function deleteMe(req, res) {
    try {
        const userId = req.user.id;

        await Schedule.deleteMany({ user: userId });
        await User.findByIdAndDelete(req.user.id);

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
}

export async function protect(req, res, next) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in! Please log in to get access.",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: "fail",
            message: "The user belonging to this token no longer exists.",
        });
    }

    req.user = currentUser;
    next();
}

